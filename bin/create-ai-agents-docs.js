#!/usr/bin/env node
import { resolve } from 'node:path'
import { createRequire } from 'node:module'
import { parseCliArgs, HELP_TEXT } from '../lib/cli.js'
import { resolveTemplate, listBuiltInTemplates } from '../lib/resolve-template.js'
import { fetchRemoteTemplate } from '../lib/fetch-template.js'
import { copyTemplate } from '../lib/copy-template.js'
import {
  readTemplateConfig,
  collectVariables,
  substituteVariables,
  createSymlinks,
  runPostCopyHook,
} from '../lib/template-config.js'
import { promptText, promptSelect } from '../lib/prompt.js'
import { green, yellow, cyan, bold, dim } from '../lib/colors.js'

const require = createRequire(import.meta.url)
const pkg = require('../package.json')

const {
  template: templateArg,
  output: outputArg,
  force,
  help,
  version,
  interactive,
} = parseCliArgs()

if (help) {
  console.log(HELP_TEXT)
  process.exit(0)
}

if (version) {
  console.log(pkg.version)
  process.exit(0)
}

let templateName = templateArg ?? 'default'
let outputPath = outputArg ?? process.cwd()

if (interactive) {
  const builtIns = listBuiltInTemplates()
  const choices = [
    ...builtIns.map(({ name, description }) => ({
      label: description ? `${name} — ${description}` : name,
      value: name,
    })),
    { label: 'custom URL or path', value: '__custom__' },
  ]

  const selected = await promptSelect(cyan('? Which template would you like to use?'), choices)

  if (selected === '__custom__') {
    templateName = await promptText(cyan('  Enter a GitHub URL or local path'))
  } else {
    templateName = selected
  }

  outputPath = await promptText(cyan('? Where should we create the files?'), '.')
}

const destDir = resolve(outputPath)

let resolved
try {
  resolved = resolveTemplate(templateName)
} catch (err) {
  console.error(`${bold('Error:')} ${err.message}`)
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
    console.error(`${bold('Error:')} ${err.message}`)
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
  console.error(`${bold('Error:')} ${err.message}`)
  process.exit(1)
}

const ignoreList = ['template.json', ...(config.ignore ?? [])]

let variableValues = {}
try {
  variableValues = await collectVariables(config.variables)
} catch (err) {
  cleanup()
  console.error(`${bold('Error:')} ${err.message}`)
  process.exit(1)
}

const transform =
  Object.keys(variableValues).length > 0
    ? (content) => substituteVariables(content, variableValues)
    : undefined

let created, skipped
try {
  ;({ created, skipped } = copyTemplate(templateDir, destDir, ignoreList, transform, force))
} catch (err) {
  cleanup()
  console.error(`${bold('Error:')} ${err.message}`)
  process.exit(1)
}

let createdLinks = []
let skippedLinks = []
try {
  ;({ created: createdLinks, skipped: skippedLinks } = createSymlinks(
    config.symlinks,
    destDir,
    force,
  ))
} catch (err) {
  cleanup()
  console.error(`${bold('Error:')} ${err.message}`)
  process.exit(1)
}

cleanup()

for (const file of skipped) {
  console.warn(`  ${yellow('skipped')} ${dim('(already exists):')} ${file}`)
}
for (const file of skippedLinks) {
  console.warn(`  ${yellow('skipped')} ${dim('(already exists):')} ${file}`)
}
for (const file of created) {
  console.log(`  ${green('created:')} ${file}`)
}
for (const file of createdLinks) {
  console.log(`  ${green('created:')} ${file} ${dim('→ ' + config.symlinks[file])}`)
}

const totalCreated = created.length + createdLinks.length
console.log(`\n${green('✓')} ${bold(`${totalCreated} file(s) created`)} in ${cyan(destDir)}`)

if (config.hooks?.postCopy) {
  console.log(`\n${dim('Running postCopy hook...')}`)
  try {
    runPostCopyHook(config.hooks.postCopy, destDir)
  } catch (err) {
    console.error(`${bold('Error:')} ${err.message}`)
    process.exit(1)
  }
}
