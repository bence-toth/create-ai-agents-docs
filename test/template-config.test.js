import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, writeFileSync, readlinkSync, existsSync, mkdirSync } from 'node:fs'
import { Readable, Writable } from 'node:stream'
import { join } from 'node:path'
import { tmpdir } from 'node:os'

function makeInput(lines) {
  const readable = new Readable({ read() {} })
  for (const line of lines) readable.push(`${line}\n`)
  // Push EOF so readline's question() callback fires without needing rl.close() first
  readable.push(null)
  return readable
}

function makeOutput() {
  const chunks = []
  const writable = new Writable({
    write(chunk, _enc, cb) {
      chunks.push(chunk.toString())
      cb()
    },
  })
  writable.getText = () => chunks.join('')
  return writable
}
import {
  readTemplateConfig,
  collectVariables,
  substituteVariables,
  createSymlinks,
  runPostCopyHook,
} from '../lib/template-config.js'

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

// ── collectVariables ────────────────────────────────────────────────────────

describe('collectVariables', () => {
  it('returns empty object when variables is undefined', async () => {
    const result = await collectVariables(undefined)
    assert.deepEqual(result, {})
  })

  it('returns empty object when variables is empty', async () => {
    const result = await collectVariables({})
    assert.deepEqual(result, {})
  })

  it('collects a single variable from user input', async () => {
    const streams = { input: makeInput(['Alice']), output: makeOutput() }
    const result = await collectVariables({ name: { prompt: 'Your name' } }, streams)
    assert.deepEqual(result, { name: 'Alice' })
  })

  it('uses the default value when user enters nothing', async () => {
    const streams = { input: makeInput(['']), output: makeOutput() }
    const result = await collectVariables(
      { name: { prompt: 'Your name', default: 'World' } },
      streams,
    )
    assert.deepEqual(result, { name: 'World' })
  })

  it('collects multiple variables in order', async () => {
    const streams = { input: makeInput(['Bob', 'blue']), output: makeOutput() }
    const result = await collectVariables(
      {
        name: { prompt: 'Your name' },
        color: { prompt: 'Favorite color' },
      },
      streams,
    )
    assert.deepEqual(result, { name: 'Bob', color: 'blue' })
  })

  it('includes default hint in the prompt output', async () => {
    const output = makeOutput()
    const streams = { input: makeInput(['']), output }
    await collectVariables({ name: { prompt: 'Your name', default: 'World' } }, streams)
    assert.ok(output.getText().includes('(World)'), `expected "(World)" in: ${output.getText()}`)
  })

  it('trims whitespace from user input', async () => {
    const streams = { input: makeInput(['  trimmed  ']), output: makeOutput() }
    const result = await collectVariables({ name: { prompt: 'Your name' } }, streams)
    assert.deepEqual(result, { name: 'trimmed' })
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

// ── createSymlinks ──────────────────────────────────────────────────────────

describe('createSymlinks', () => {
  it('creates symlinks in destDir', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      writeFileSync(join(dest, 'AGENTS.md'), '# Agents')
      const { created, skipped } = createSymlinks({ 'CLAUDE.md': 'AGENTS.md' }, dest)
      assert.deepEqual(created, ['CLAUDE.md'])
      assert.deepEqual(skipped, [])
      assert.equal(readlinkSync(join(dest, 'CLAUDE.md')), 'AGENTS.md')
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
  })

  it('creates parent directories for nested symlinks', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      writeFileSync(join(dest, 'AGENTS.md'), '# Agents')
      const { created } = createSymlinks(
        { '.github/copilot-instructions.md': '../AGENTS.md' },
        dest,
      )
      assert.deepEqual(created, ['.github/copilot-instructions.md'])
      assert.equal(readlinkSync(join(dest, '.github/copilot-instructions.md')), '../AGENTS.md')
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
  })

  it('skips symlinks that already exist when force is false', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      writeFileSync(join(dest, 'AGENTS.md'), '# Agents')
      writeFileSync(join(dest, 'CLAUDE.md'), '# Existing')
      const { created, skipped } = createSymlinks({ 'CLAUDE.md': 'AGENTS.md' }, dest, false)
      assert.deepEqual(created, [])
      assert.deepEqual(skipped, ['CLAUDE.md'])
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
  })

  it('overwrites existing files when force is true', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      writeFileSync(join(dest, 'AGENTS.md'), '# Agents')
      writeFileSync(join(dest, 'CLAUDE.md'), '# Existing')
      const { created, skipped } = createSymlinks({ 'CLAUDE.md': 'AGENTS.md' }, dest, true)
      assert.deepEqual(created, ['CLAUDE.md'])
      assert.deepEqual(skipped, [])
      assert.equal(readlinkSync(join(dest, 'CLAUDE.md')), 'AGENTS.md')
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
  })

  it('returns empty arrays when symlinks config is empty', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      const { created, skipped } = createSymlinks({}, dest)
      assert.deepEqual(created, [])
      assert.deepEqual(skipped, [])
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
  })

  it('returns empty arrays when symlinks config is undefined', () => {
    const dest = mkdtempSync(join(tmpdir(), 'symlink-test-'))
    try {
      const { created, skipped } = createSymlinks(undefined, dest)
      assert.deepEqual(created, [])
      assert.deepEqual(skipped, [])
    } finally {
      rmSync(dest, { recursive: true, force: true })
    }
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
