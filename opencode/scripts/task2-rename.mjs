#!/usr/bin/env bun
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { AGENT_RENAME_MAP } from './lib/agent-fleet-map.mjs';

const MODE_AGENT_TARGETS = new Set([
  'chizu--implementation-planner',
  'shiranui--migration-guide',
  'sojobo--system-strategist',
]);

let renamed = 0;
let updatedName = 0;
let fixedMode = 0;
let skipped = 0;

for (const entry of AGENT_RENAME_MAP) {
  const oldPath = `agents/${entry.current}.md`;
  const newPath = `agents/${entry.next}.md`;

  if (existsSync(newPath) && !existsSync(oldPath)) {
    console.log(`skip: ${newPath} already exists; ${oldPath} already gone`);
    skipped += 1;
    continue;
  }

  if (!existsSync(oldPath)) {
    console.error(`error: ${oldPath} missing — cannot rename`);
    process.exitCode = 1;
    continue;
  }

  execFileSync('git', ['mv', oldPath, newPath], { stdio: 'inherit' });
  renamed += 1;

  let body = readFileSync(newPath, 'utf8');

  const nameLineRegex = /^name:\s*.*$/m;
  if (nameLineRegex.test(body)) {
    body = body.replace(nameLineRegex, `name: ${entry.next}`);
    updatedName += 1;
  } else {
    console.error(`warn: ${newPath} has no name: frontmatter line`);
  }

  if (MODE_AGENT_TARGETS.has(entry.next) && /(^|\n)mode:\s*agent\s*($|\n)/.test(body)) {
    body = body.replace(/(^|\n)mode:\s*agent(\s*($|\n))/, (_, a, b) => `${a}mode: all${b}`);
    fixedMode += 1;
  }

  writeFileSync(newPath, body);
}

console.log(`\nsummary: renamed=${renamed} updatedName=${updatedName} fixedMode=${fixedMode} skipped=${skipped}`);
