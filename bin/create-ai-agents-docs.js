#!/usr/bin/env node
import { resolve } from 'node:path'
import { parseCliArgs } from '../lib/cli.js'
import { resolveTemplate } from '../lib/resolve-template.js'
import { copyTemplate } from '../lib/copy-template.js'

const { template, output } = parseCliArgs()
const destDir = resolve(output)

let templateDir
try {
  const resolved = resolveTemplate(template)
  if (resolved.type === 'url') {
    console.error(`Error: URL templates are not yet supported. Use a local path or built-in name.`)
    process.exit(1)
  }
  templateDir = resolved.path
} catch (err) {
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

let created, skipped
try {
  ;({ created, skipped } = copyTemplate(templateDir, destDir))
} catch (err) {
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

for (const file of skipped) {
  console.warn(`  skipped (already exists): ${file}`)
}
for (const file of created) {
  console.log(`  created: ${file}`)
}

console.log(`\nDone. ${created.length} file(s) created in ${destDir}.`)
