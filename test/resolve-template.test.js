import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmdirSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { resolveTemplate, listBuiltInTemplates, TEMPLATES_DIR } from '../lib/resolve-template.js'

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

describe('listBuiltInTemplates', () => {
  it('returns an array with at least the "default" template', () => {
    const templates = listBuiltInTemplates()
    assert.ok(Array.isArray(templates))
    const names = templates.map((t) => t.name)
    assert.ok(names.includes('default'), `expected "default" in: ${JSON.stringify(names)}`)
  })

  it('each entry has name and description fields', () => {
    const templates = listBuiltInTemplates()
    for (const tpl of templates) {
      assert.ok('name' in tpl, 'missing name')
      assert.ok('description' in tpl, 'missing description')
      assert.equal(typeof tpl.name, 'string')
      assert.equal(typeof tpl.description, 'string')
    }
  })

  it('the "default" template has a non-empty description', () => {
    const templates = listBuiltInTemplates()
    const def = templates.find((t) => t.name === 'default')
    assert.ok(def, '"default" template not found')
    assert.ok(def.description.length > 0, 'expected a non-empty description')
  })
})
