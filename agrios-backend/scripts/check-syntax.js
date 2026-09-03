#!/usr/bin/env node
// Pre-deploy gate: recursively runs `node --check` on every .js file under
// src/. Wired into render.yaml's buildCommand, so a syntax error here fails
// the Render build — the previous good deploy stays live instead of a
// broken one going out. This is what "no staging environment" was missing:
// there was nothing between "paste into GitHub" and "it's live in production."
//
// Usage: node scripts/check-syntax.js

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

const SRC_DIR = path.join(__dirname, '..', 'src');

function findJsFiles(dir) {
  let results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(findJsFiles(full));
    } else if (entry.isFile() && entry.name.endsWith('.js')) {
      results.push(full);
    }
  }
  return results;
}

const files = findJsFiles(SRC_DIR);
let hadError = false;

for (const file of files) {
  const rel = path.relative(process.cwd(), file);
  try {
    execFileSync(process.execPath, ['--check', file], { stdio: 'pipe' });
    console.log(`OK   ${rel}`);
  } catch (e) {
    hadError = true;
    console.error(`FAIL ${rel}:`);
    console.error(e.stderr ? e.stderr.toString() : e.message);
  }
}

console.log(`\nChecked ${files.length} file(s).`);

if (hadError) {
  console.error('Syntax check FAILED — build stopped, previous deploy stays live.');
  process.exit(1);
} else {
  console.log('All backend files parse cleanly.');
}
