# cli/tests/test_aggregate.py
from puraguin import db, aggregate

def _seed(conn):
    conn.execute("INSERT INTO sessions(session_id,platform,started_at,last_seen_at) VALUES('s1','claude-code','2026-05-27T10:00:00Z','2026-05-27T11:00:00Z')")
    for i, (skill, reaction, success) in enumerate([
        ("brainstorming","positive",1),
        ("brainstorming","negative",1),
        ("brainstorming","positive",1),
        ("diagnose","neutral",1),
        ("brainstorming","none",0),  # load failure
    ]):
        conn.execute(
            "INSERT INTO skill_invocations(session_id,ts,skill,tool_use_id,turn_index,trigger,load_success) "
            "VALUES('s1','2026-05-27T10:00:00Z',?,?,?,?,?)",
            (skill, f"toolu_{i}", i, "user-typed" if i == 0 else "model", success),
        )
        inv_id = conn.execute("SELECT last_insert_rowid() AS id").fetchone()["id"]
        conn.execute(
            "INSERT INTO invocation_judgments(invocation_id,used_downstream,user_reaction,judgment_model,judged_at) "
            "VALUES(?,?,?,?, '2026-05-27T11:00:00Z')",
            (inv_id, 1, reaction, "fake"),
        )
    conn.commit()

def test_aggregate_writes_per_skill_rollups(puraguin_home):
    db.init()
    conn = db.connect()
    _seed(conn)
    conn.close()

    aggregate.run()
    conn = db.connect()
    br = conn.execute("SELECT * FROM skill_stats WHERE skill='brainstorming' AND window='all'").fetchone()
    assert br["invocations"] == 4
    assert br["positive"] == 2
    assert br["negative"] == 1
    assert br["none_reaction"] == 1
    assert br["load_failures"] == 1
    assert br["user_typed"] == 1
    assert br["model_triggered"] == 3
    conn.close()
