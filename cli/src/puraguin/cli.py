import argparse
import json
import sys

def _cmd_ingest(args):
    from puraguin import ingest
    counts = ingest.run(platform=args.platform)
    print(json.dumps(counts, indent=2))

def _cmd_judge(args):
    from puraguin.judge import get_backend, orchestrator
    from puraguin import config
    cfg = config.load().judge
    backend_name = args.judge or cfg.backend
    backend = get_backend(backend_name)
    n_inv = orchestrator.judge_invocations(backend, reanalyze_skill=args.reanalyze)
    n_gap = 0
    if not args.skip_gaps:
        n_gap = orchestrator.detect_gaps(backend, sample_rate=cfg.gap_sample_rate)
    print(json.dumps({"invocations_judged": n_inv, "gaps_found": n_gap}, indent=2))

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="puraguin")
    sub = p.add_subparsers(dest="cmd", required=True)

    ing = sub.add_parser("ingest", help="Phase A: ingest new events into state.db")
    ing.add_argument("--platform", default="claude-code")
    ing.set_defaults(func=_cmd_ingest)

    jud = sub.add_parser("judge", help="Phase B: classify invocations and detect gaps")
    jud.add_argument("--judge", default=None, help="backend: anthropic|codex")
    jud.add_argument("--reanalyze", default=None, help="skill name or 'all'")
    jud.add_argument("--skip-gaps", action="store_true")
    jud.set_defaults(func=_cmd_judge)

    return p

def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    args.func(args)
    return 0
