import { readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
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
 * @returns {Promise<Record<string, string>>}
 */
export async function collectVariables(variables) {
  if (!variables || Object.keys(variables).length === 0) {
    return {}
  }

  const rl = createInterface({ input: process.stdin, output: process.stdout })
  const ask = (question) =>
    new Promise((resolve) => rl.question(question, (answer) => resolve(answer)))

  const values = {}
  for (const [name, spec] of Object.entries(variables)) {
    const defaultHint =
      spec.default !== null && spec.default !== undefined ? ` (${spec.default})` : ''
    const raw = await ask(`${spec.prompt}${defaultHint}: `)
    values[name] = raw.trim() || spec.default || ''
  }

  rl.close()
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
