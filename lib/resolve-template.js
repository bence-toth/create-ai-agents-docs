import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const TEMPLATES_DIR = join(fileURLToPath(import.meta.url), '../../templates')

const BUILT_IN_TEMPLATES = new Set(
  readdirSync(TEMPLATES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name),
)

/**
 * @param {string} name
 * @returns {boolean}
 */
function isLocalPath(name) {
  return name.startsWith('./') || name.startsWith('../') || name.startsWith('/')
}

/**
 * @param {string} name
 * @returns {boolean}
 */
function isUrl(name) {
  return name.startsWith('https://') || name.startsWith('http://')
}

/**
 * Resolves a template name/path/URL to an absolute local directory path.
 * Built-in names take precedence over local paths and URLs.
 *
 * @param {string} template
 * @returns {{ type: 'builtin' | 'local' | 'url', path?: string, url?: string }}
 */
export function resolveTemplate(template) {
  if (BUILT_IN_TEMPLATES.has(template)) {
    const dir = join(TEMPLATES_DIR, template)
    return { type: 'builtin', path: dir }
  }

  if (isLocalPath(template)) {
    const dir = resolve(template)
    if (!existsSync(dir)) {
      throw new Error(`Template path not found: ${dir}`)
    }
    return { type: 'local', path: dir }
  }

  if (isUrl(template)) {
    return { type: 'url', url: template }
  }

  throw new Error(
    `Unknown template "${template}". Use a built-in name, a local path (./...), or a URL (https://...).`,
  )
}

/**
 * Returns a list of all built-in template names with their descriptions.
 * Reads template.json from each template directory to get the description.
 *
 * @returns {{ name: string, description: string }[]}
 */
export function listBuiltInTemplates() {
  return [...BUILT_IN_TEMPLATES]
    .sort((a, b) => {
      if (a === 'default') return -1
      if (b === 'default') return 1
      return a.localeCompare(b)
    })
    .map((name) => {
      const configPath = join(TEMPLATES_DIR, name, 'template.json')
      let description = ''
      if (existsSync(configPath)) {
        try {
          const config = JSON.parse(readFileSync(configPath, 'utf8'))
          description = config.description ?? ''
        } catch {
          // ignore
        }
      }
      return { name, description }
    })
}

export { TEMPLATES_DIR, BUILT_IN_TEMPLATES }
