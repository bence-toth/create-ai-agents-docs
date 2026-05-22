import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { spawnSync } from 'node:child_process'
import { fetchLocalTemplate, fetchRemoteTemplate } from '../lib/fetch-template.js'

describe('fetchLocalTemplate', () => {
  it('returns the path and a no-op cleanup for an existing directory', () => {
    const dir = mkdtempSync(join(tmpdir(), 'fetch-local-test-'))
    try {
      const { path, cleanup } = fetchLocalTemplate(dir)
      assert.equal(path, dir)
      assert.doesNotThrow(() => cleanup())
      assert.ok(existsSync(dir), 'cleanup should not delete a local path')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('throws when the path does not exist', () => {
    assert.throws(() => fetchLocalTemplate('/nonexistent/path/to/template'), /not found/)
  })

  it('throws when the path is a file, not a directory', () => {
    const dir = mkdtempSync(join(tmpdir(), 'fetch-local-test-'))
    const file = join(dir, 'not-a-dir.txt')
    writeFileSync(file, 'hello')
    try {
      assert.throws(() => fetchLocalTemplate(file), /not a directory/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('fetchRemoteTemplate', () => {
  it('throws a descriptive error when git clone fails', () => {
    // Use an invalid URL so git clone fails fast without network access
    assert.throws(
      () => fetchRemoteTemplate('https://invalid.example.invalid/repo.git'),
      /git clone failed|Failed to run git/,
    )
  })

  it('returns path and a cleanup that removes the cloned directory', () => {
    // Create a minimal local git repo to clone from (no network required)
    const sourceDir = mkdtempSync(join(tmpdir(), 'fetch-remote-source-'))
    try {
      spawnSync('git', ['init'], { cwd: sourceDir, stdio: 'pipe' })
      spawnSync('git', ['commit', '--allow-empty', '-m', 'init'], {
        cwd: sourceDir,
        stdio: 'pipe',
        env: {
          ...process.env,
          GIT_AUTHOR_NAME: 'test',
          GIT_AUTHOR_EMAIL: 'test@test.com',
          GIT_COMMITTER_NAME: 'test',
          GIT_COMMITTER_EMAIL: 'test@test.com',
        },
      })

      const { path, cleanup } = fetchRemoteTemplate(sourceDir)
      assert.ok(existsSync(path), 'cloned directory should exist')

      cleanup()
      assert.ok(!existsSync(path), 'cleanup should remove the cloned directory')
    } finally {
      rmSync(sourceDir, { recursive: true, force: true })
    }
  })
})
