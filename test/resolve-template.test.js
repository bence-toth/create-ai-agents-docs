import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolveTemplate, TEMPLATES_DIR } from '../lib/resolve-template.js'

describe('resolveTemplate', () => {
  it('resolves built-in "default" template', () => {
    const result = resolveTemplate('default')
    assert.equal(result.type, 'builtin')
    assert.equal(result.path, join(TEMPLATES_DIR, 'default'))
  })

  it('resolves a local path starting with ./', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tpl-test-'))
    try {
      const result = resolveTemplate(dir)
      assert.equal(result.type, 'local')
      assert.equal(result.path, dir)
    } finally {
      rmdirSync(dir)
    }
  })

  it('resolves an absolute local path', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tpl-test-'))
    try {
      const result = resolveTemplate(dir)
      assert.equal(result.type, 'local')
    } finally {
      rmdirSync(dir)
    }
  })

  it('resolves an https URL', () => {
    const result = resolveTemplate('https://github.com/example/repo')
    assert.equal(result.type, 'url')
    assert.equal(result.url, 'https://github.com/example/repo')
  })

  it('throws when local path does not exist', () => {
    assert.throws(() => resolveTemplate('/nonexistent/path/to/template'), /not found/)
  })

  it('throws on unknown non-path, non-url value', () => {
    assert.throws(() => resolveTemplate('unknown-name'), /Unknown template/)
  })

  it('built-in name takes precedence over any path interpretation', () => {
    const result = resolveTemplate('default')
    assert.equal(result.type, 'builtin')
  })
})
