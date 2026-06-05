import { test, expect } from 'bun:test';
import { AGENT_RENAME_MAP, LEGACY_AGENT_ALIASES, ALL_AGENT_TARGETS } from '../lib/agent-fleet-map.mjs';

test('rename map covers all 38 agents with unique current and target names', () => {
  expect(AGENT_RENAME_MAP).toHaveLength(38);

  const current = new Set(AGENT_RENAME_MAP.map(entry => entry.current));
  const target = new Set(AGENT_RENAME_MAP.map(entry => entry.next));

  expect(current.size).toBe(38);
  expect(target.size).toBe(38);
  expect(ALL_AGENT_TARGETS).toHaveLength(38);
});

test('legacy alias map points to renamed targets', () => {
  expect(LEGACY_AGENT_ALIASES['code-runner']).toBe('karakuri--command-runner');
  expect(LEGACY_AGENT_ALIASES['explorer']).toBe('mikoshi--code-pathfinder');
  expect(LEGACY_AGENT_ALIASES['source-retriever']).toBe('yamabiko--source-echo');
  expect(LEGACY_AGENT_ALIASES['technical-writer']).toBe('makimono--docs-scribe');
});
