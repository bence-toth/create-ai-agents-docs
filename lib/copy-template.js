import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'

/**
 * @typedef {{ created: string[], skipped: string[] }} CopyResult
 */

/**
 * Recursively copies files from srcDir to destDir.
 * Skips files that already exist in destDir unless force is true.
 *
 * @param {string} srcDir  - absolute path to the template directory
 * @param {string} destDir - absolute path to the target directory
 * @param {string[]} [ignore] - relative paths to skip (e.g. ['template.json'])
 * @param {(content: string, relPath: string) => string} [transform] - optional content transformer
 * @param {boolean} [force] - overwrite existing files
 * @returns {CopyResult}
 */
export function copyTemplate(srcDir, destDir, ignore = [], transform, force = false) {
  const ignoreSet = new Set(ignore)
  const created = []
  const skipped = []

  function walk(currentSrc) {
    const entries = readdirSync(currentSrc, { withFileTypes: true })
    for (const entry of entries) {
      const srcPath = join(currentSrc, entry.name)
      const relPath = relative(srcDir, srcPath)

      if (ignoreSet.has(relPath)) continue

      const destPath = join(destDir, relPath)

      if (entry.isDirectory()) {
        mkdirSync(destPath, { recursive: true })
        walk(srcPath)
      } else {
        mkdirSync(dirname(destPath), { recursive: true })
        if (existsSync(destPath) && !force) {
          skipped.push(relPath)
        } else {
          if (transform) {
            const content = readFileSync(srcPath, 'utf8')
            writeFileSync(destPath, transform(content, relPath), 'utf8')
          } else {
            writeFileSync(destPath, readFileSync(srcPath))
          }
          created.push(relPath)
        }
      }
    }
  }

  if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
    throw new Error(`Template source directory not found: ${srcDir}`)
  }

  mkdirSync(destDir, { recursive: true })
  walk(srcDir)

  return { created, skipped }
}
