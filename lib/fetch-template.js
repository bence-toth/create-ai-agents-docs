import { mkdtempSync, rmSync, existsSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'

/**
 * Clones a GitHub repo (shallow) into a temp directory and returns the path.
 * Caller is responsible for cleaning up the temp directory when done.
 *
 * @param {string} url - https:// URL of the git repo
 * @returns {{ path: string, cleanup: () => void }}
 */
export function fetchRemoteTemplate(url) {
  const dir = mkdtempSync(join(tmpdir(), 'create-ai-agents-docs-'))
  const result = spawnSync('git', ['clone', '--depth', '1', url, dir], {
    stdio: 'pipe',
    encoding: 'utf8',
  })

  if (result.error) {
    rmSync(dir, { recursive: true, force: true })
    throw new Error(`Failed to run git: ${result.error.message}`)
  }

  if (result.status !== 0) {
    rmSync(dir, { recursive: true, force: true })
    const stderr = result.stderr?.trim() ?? ''
    throw new Error(`git clone failed: ${stderr || `exit code ${result.status}`}`)
  }

  return {
    path: dir,
    cleanup() {
      rmSync(dir, { recursive: true, force: true })
    },
  }
}

/**
 * Validates and returns a local filesystem template path.
 *
 * @param {string} localPath - absolute path to a local template directory
 * @returns {{ path: string, cleanup: () => void }}
 */
export function fetchLocalTemplate(localPath) {
  if (!existsSync(localPath)) {
    throw new Error(`Template path not found: ${localPath}`)
  }
  if (!statSync(localPath).isDirectory()) {
    throw new Error(`Template path is not a directory: ${localPath}`)
  }
  return {
    path: localPath,
    cleanup() {},
  }
}
