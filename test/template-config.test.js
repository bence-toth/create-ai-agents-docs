import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { readTemplateConfig, substituteVariables, runPostCopyHook } from '../lib/template-config.js'

// ── readTemplateConfig ──────────────────────────────────────────────────────

describe('readTemplateConfig', () => {
  it('returns empty object when template.json is absent', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tpl-cfg-test-'))
    try {
      const config = readTemplateConfig(dir)
      assert.deepEqual(config, {})
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('parses a valid template.json', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tpl-cfg-test-'))
    try {
      const expected = {
        name: 'Test Template',
        variables: { foo: { prompt: 'Enter foo', default: 'bar' } },
        hooks: { postCopy: 'echo done' },
        ignore: ['README-template.md'],
      }
      writeFileSync(join(dir, 'template.json'), JSON.stringify(expected))
      const config = readTemplateConfig(dir)
      assert.deepEqual(config, expected)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('throws on invalid JSON', () => {
    const dir = mkdtempSync(join(tmpdir(), 'tpl-cfg-test-'))
    try {
      writeFileSync(join(dir, 'template.json'), '{ not valid json }')
      assert.throws(() => readTemplateConfig(dir), /Failed to parse template\.json/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})

// ── substituteVariables ─────────────────────────────────────────────────────

describe('substituteVariables', () => {
  it('replaces a single placeholder', () => {
    const result = substituteVariables('Hello, {{name}}!', { name: 'World' })
    assert.equal(result, 'Hello, World!')
  })

  it('replaces multiple different placeholders', () => {
    const result = substituteVariables('{{greeting}}, {{name}}!', {
      greeting: 'Hi',
      name: 'Alice',
    })
    assert.equal(result, 'Hi, Alice!')
  })

  it('replaces the same placeholder appearing multiple times', () => {
    const result = substituteVariables('{{x}} and {{x}}', { x: 'foo' })
    assert.equal(result, 'foo and foo')
  })

  it('leaves unknown placeholders untouched', () => {
    const result = substituteVariables('Hello, {{unknown}}!', { name: 'World' })
    assert.equal(result, 'Hello, {{unknown}}!')
  })

  it('returns content unchanged when variables map is empty', () => {
    const content = 'No placeholders here.'
    assert.equal(substituteVariables(content, {}), content)
  })

  it('returns content unchanged when variables is undefined', () => {
    const content = '{{foo}} bar'
    assert.equal(substituteVariables(content, undefined), content)
  })
})

// ── runPostCopyHook ─────────────────────────────────────────────────────────

describe('runPostCopyHook', () => {
  it('runs a successful command without throwing', () => {
    const dir = mkdtempSync(join(tmpdir(), 'hook-test-'))
    try {
      assert.doesNotThrow(() => runPostCopyHook('echo hello', dir))
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('throws when the command exits non-zero', () => {
    const dir = mkdtempSync(join(tmpdir(), 'hook-test-'))
    try {
      assert.throws(() => runPostCopyHook('exit 1', dir), /postCopy hook exited with code 1/)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  it('throws when the command cannot be found', () => {
    const dir = mkdtempSync(join(tmpdir(), 'hook-test-'))
    try {
      // shell: true means we get a non-zero exit, not an ENOENT error object
      assert.throws(
        () => runPostCopyHook('this-command-does-not-exist-xyz', dir),
        /postCopy hook exited/,
      )
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })
})
