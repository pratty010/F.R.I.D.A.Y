import argparse
import json
import sys

def _cmd_ingest(args):
    from puraguin import ingest
    counts = ingest.run(platform=args.platform)
    print(json.dumps(counts, indent=2))

def build_parser() -> argparse.ArgumentParser:
    p = argparse.ArgumentParser(prog="puraguin")
    sub = p.add_subparsers(dest="cmd", required=True)

    ing = sub.add_parser("ingest", help="Phase A: ingest new events into state.db")
    ing.add_argument("--platform", default="claude-code")
    ing.set_defaults(func=_cmd_ingest)

    return p

def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    args.func(args)
    return 0
