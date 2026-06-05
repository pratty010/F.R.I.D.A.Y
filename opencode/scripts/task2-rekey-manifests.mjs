#!/usr/bin/env bun
import { readFileSync, writeFileSync } from 'node:fs';
import { AGENT_RENAME_MAP } from './lib/agent-fleet-map.mjs';

const RENAME_BY_CURRENT = new Map(AGENT_RENAME_MAP.map((e) => [e.current, e.next]));

function rekeyPreservingOrder(obj, lookup) {
  const out = {};
  for (const key of Object.keys(obj)) {
    const newKey = lookup.get(key) ?? key;
    out[newKey] = obj[key];
  }
  return out;
}

const routingPath = 'docs/routing-manifest.json';
const routing = JSON.parse(readFileSync(routingPath, 'utf8'));

routing.specialists = rekeyPreservingOrder(routing.specialists, RENAME_BY_CURRENT);
routing.subagents = rekeyPreservingOrder(routing.subagents, RENAME_BY_CURRENT);

writeFileSync(routingPath, `${JSON.stringify(routing, null, 2)}\n`);
console.log(`rekeyed: ${routingPath}`);

const fleetPath = 'fleet-manifest.json';
const fleet = JSON.parse(readFileSync(fleetPath, 'utf8'));

let rewritten = 0;
for (const component of fleet.components ?? []) {
  for (let i = 0; i < (component.files ?? []).length; i += 1) {
    const file = component.files[i];
    const m = file.match(/^agents\/([^/]+)\.md$/);
    if (!m) continue;
    const newStem = RENAME_BY_CURRENT.get(m[1]) ?? m[1];
    if (newStem !== m[1]) {
      component.files[i] = `agents/${newStem}.md`;
      rewritten += 1;
    }
  }
}

writeFileSync(fleetPath, `${JSON.stringify(fleet, null, 2)}\n`);
console.log(`rekeyed: ${fleetPath} (${rewritten} paths updated)`);
