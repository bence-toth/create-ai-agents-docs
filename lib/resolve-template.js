import { existsSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const TEMPLATES_DIR = join(fileURLToPath(import.meta.url), '../../templates')

const BUILT_IN_TEMPLATES = new Set(['default'])

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

export { TEMPLATES_DIR, BUILT_IN_TEMPLATES }
