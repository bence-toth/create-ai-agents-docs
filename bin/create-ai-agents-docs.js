#!/usr/bin/env node
import { resolve } from 'node:path'
import { parseCliArgs } from '../lib/cli.js'
import { resolveTemplate } from '../lib/resolve-template.js'
import { fetchRemoteTemplate } from '../lib/fetch-template.js'
import { copyTemplate } from '../lib/copy-template.js'
import {
  readTemplateConfig,
  collectVariables,
  substituteVariables,
  runPostCopyHook,
} from '../lib/template-config.js'

const { template, output } = parseCliArgs()
const destDir = resolve(output)

let resolved
try {
  resolved = resolveTemplate(template)
} catch (err) {
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

let templateDir
let cleanup = () => {}

if (resolved.type === 'url') {
  try {
    const fetched = fetchRemoteTemplate(resolved.url)
    templateDir = fetched.path
    cleanup = fetched.cleanup
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
} else {
  templateDir = resolved.path
}

let config
try {
  config = readTemplateConfig(templateDir)
} catch (err) {
  cleanup()
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

const ignoreList = ['template.json', ...(config.ignore ?? [])]

let variableValues = {}
try {
  variableValues = await collectVariables(config.variables)
} catch (err) {
  cleanup()
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

const transform =
  Object.keys(variableValues).length > 0
    ? (content) => substituteVariables(content, variableValues)
    : undefined

let created, skipped
try {
  ;({ created, skipped } = copyTemplate(templateDir, destDir, ignoreList, transform))
} catch (err) {
  cleanup()
  console.error(`Error: ${err.message}`)
  process.exit(1)
}

cleanup()

for (const file of skipped) {
  console.warn(`  skipped (already exists): ${file}`)
}
for (const file of created) {
  console.log(`  created: ${file}`)
}

console.log(`\nDone. ${created.length} file(s) created in ${destDir}.`)

if (config.hooks?.postCopy) {
  console.log('\nRunning postCopy hook...')
  try {
    runPostCopyHook(config.hooks.postCopy, destDir)
  } catch (err) {
    console.error(`Error: ${err.message}`)
    process.exit(1)
  }
}
