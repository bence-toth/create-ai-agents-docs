import { readFileSync, existsSync, symlinkSync, mkdirSync, unlinkSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { spawnSync } from 'node:child_process'
import { createInterface } from 'node:readline'

/**
 * @typedef {Object} TemplateVariable
 * @property {string} prompt
 * @property {string} [default]
 */

/**
 * @typedef {Object} TemplateConfig
 * @property {string} [name]
 * @property {string} [description]
 * @property {Record<string, TemplateVariable>} [variables]
 * @property {{ postCopy?: string }} [hooks]
 * @property {string[]} [ignore]
 * @property {Record<string, string>} [symlinks] - map of link path → target path (relative)
 */

/**
 * Reads and parses template.json from a template directory.
 * Returns an empty config object if template.json is absent.
 *
 * @param {string} templateDir
 * @returns {TemplateConfig}
 */
export function readTemplateConfig(templateDir) {
  const configPath = join(templateDir, 'template.json')
  if (!existsSync(configPath)) {
    return {}
  }
  try {
    return JSON.parse(readFileSync(configPath, 'utf8'))
  } catch (err) {
    throw new Error(`Failed to parse template.json: ${err.message}`)
  }
}

/**
 * Prompts the user for each variable defined in config.variables.
 * Returns a map of variable name → resolved value.
 *
 * @param {TemplateConfig['variables']} variables
 * @param {{ input?: NodeJS.ReadableStream, output?: NodeJS.WritableStream }} [streams]
 * @returns {Promise<Record<string, string>>}
 */
export async function collectVariables(variables, streams = {}) {
  if (!variables || Object.keys(variables).length === 0) {
    return {}
  }

  const output = streams.output ?? process.stdout
  const rl = createInterface({ input: streams.input ?? process.stdin, output, terminal: false })

  // Queue-based reader so pre-buffered lines are not lost before the first ask()
  const queue = []
  let waiter = null
  rl.on('line', (line) => {
    if (waiter) {
      const resolve = waiter
      waiter = null
      resolve(line)
    } else {
      queue.push(line)
    }
  })

  const readLine = (prompt) => {
    output.write(prompt)
    if (queue.length > 0) return Promise.resolve(queue.shift())
    return new Promise((resolve) => {
      waiter = resolve
    })
  }

  const values = {}
  try {
    for (const [name, spec] of Object.entries(variables)) {
      const defaultHint =
        spec.default !== null && spec.default !== undefined ? ` (${spec.default})` : ''
      const raw = await readLine(`${spec.prompt}${defaultHint}: `)
      values[name] = raw.trim() || spec.default || ''
    }
  } finally {
    rl.close()
  }

  return values
}

/**
 * Replaces all {{variableName}} placeholders in a string.
 *
 * @param {string} content
 * @param {Record<string, string>} variables
 * @returns {string}
 */
export function substituteVariables(content, variables) {
  if (!variables || Object.keys(variables).length === 0) {
    return content
  }
  return content.replace(/\{\{(\w+)\}\}/g, (match, name) =>
    Object.prototype.hasOwnProperty.call(variables, name) ? variables[name] : match,
  )
}

/**
 * Creates symlinks in destDir as specified in config.symlinks.
 * Skips symlinks whose link path already exists unless force is true.
 *
 * @param {TemplateConfig['symlinks']} symlinks - map of linkPath → target
 * @param {string} destDir
 * @param {boolean} [force]
 * @returns {{ created: string[], skipped: string[] }}
 */
export function createSymlinks(symlinks, destDir, force = false) {
  const created = []
  const skipped = []

  if (!symlinks || Object.keys(symlinks).length === 0) {
    return { created, skipped }
  }

  for (const [linkPath, target] of Object.entries(symlinks)) {
    const absLink = join(destDir, linkPath)
    if (existsSync(absLink) && !force) {
      skipped.push(linkPath)
      continue
    }
    mkdirSync(dirname(absLink), { recursive: true })
    if (existsSync(absLink)) {
      unlinkSync(absLink)
    }
    symlinkSync(target, absLink)
    created.push(linkPath)
  }

  return { created, skipped }
}

/**
 * Runs the postCopy hook command in the given working directory.
 * Throws if the command exits non-zero.
 *
 * @param {string} command
 * @param {string} cwd
 */
export function runPostCopyHook(command, cwd) {
  const result = spawnSync(command, {
    shell: true,
    stdio: 'inherit',
    cwd,
  })

  if (result.error) {
    throw new Error(`Failed to run postCopy hook: ${result.error.message}`)
  }

  if (result.status !== 0) {
    throw new Error(`postCopy hook exited with code ${result.status}`)
  }
}
