import { existsSync, mkdirSync, readdirSync, copyFileSync, statSync } from 'node:fs'
import { join, relative, dirname } from 'node:path'

/**
 * @typedef {{ created: string[], skipped: string[] }} CopyResult
 */

/**
 * Recursively copies files from srcDir to destDir.
 * Skips files that already exist in destDir instead of overwriting.
 *
 * @param {string} srcDir  - absolute path to the template directory
 * @param {string} destDir - absolute path to the target directory
 * @param {string[]} [ignore] - relative paths to skip (e.g. ['template.json'])
 * @returns {CopyResult}
 */
export function copyTemplate(srcDir, destDir, ignore = []) {
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
        if (existsSync(destPath)) {
          skipped.push(relPath)
        } else {
          copyFileSync(srcPath, destPath)
          created.push(relPath)
        }
      }
    }
  }

  // Validate source exists
  if (!existsSync(srcDir) || !statSync(srcDir).isDirectory()) {
    throw new Error(`Template source directory not found: ${srcDir}`)
  }

  mkdirSync(destDir, { recursive: true })
  walk(srcDir)

  return { created, skipped }
}
