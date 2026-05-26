import sqlite3
from puraguin import db

def test_init_creates_all_tables(puraguin_home):
    db.init()
    conn = db.connect()
    tables = {row[0] for row in conn.execute(
        "SELECT name FROM sqlite_master WHERE type='table'"
    )}
    expected = {
        "source_files", "sessions", "skill_invocations",
        "invocation_judgments", "gap_findings",
        "available_skills_at_session", "skill_stats", "skill_improvements"
    }
    assert expected.issubset(tables)
    conn.close()

def test_init_is_idempotent(puraguin_home):
    db.init()
    db.init()

def test_wal_mode_enabled(puraguin_home):
    db.init()
    conn = db.connect()
    mode = conn.execute("PRAGMA journal_mode").fetchone()[0]
    assert mode.lower() == "wal"
    conn.close()
