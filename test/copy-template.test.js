import { describe, it, beforeEach, afterEach } from 'node:test'
import assert from 'node:assert/strict'
import { mkdtempSync, rmSync, mkdirSync, writeFileSync, readFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { copyTemplate } from '../lib/copy-template.js'

let src, dest

beforeEach(() => {
  src = mkdtempSync(join(tmpdir(), 'src-'))
  dest = mkdtempSync(join(tmpdir(), 'dest-'))
})

afterEach(() => {
  rmSync(src, { recursive: true, force: true })
  rmSync(dest, { recursive: true, force: true })
})

describe('copyTemplate', () => {
  it('copies flat files to dest', () => {
    writeFileSync(join(src, 'AGENTS.md'), '# Agents')
    writeFileSync(join(src, 'README.md'), '# Readme')

    const { created, skipped } = copyTemplate(src, dest)

    assert.deepEqual(created.sort(), ['AGENTS.md', 'README.md'])
    assert.deepEqual(skipped, [])
    assert.equal(readFileSync(join(dest, 'AGENTS.md'), 'utf8'), '# Agents')
  })

  it('copies nested directories preserving structure', () => {
    mkdirSync(join(src, 'docs', 'adr'), { recursive: true })
    writeFileSync(join(src, 'docs', 'adr', 'template.md'), '# ADR')

    const { created } = copyTemplate(src, dest)

    assert.ok(created.includes(join('docs', 'adr', 'template.md')))
    assert.ok(existsSync(join(dest, 'docs', 'adr', 'template.md')))
  })

  it('skips files that already exist in dest', () => {
    writeFileSync(join(src, 'README.md'), '# New')
    writeFileSync(join(dest, 'README.md'), '# Existing')

    const { created, skipped } = copyTemplate(src, dest)

    assert.deepEqual(created, [])
    assert.deepEqual(skipped, ['README.md'])
    assert.equal(readFileSync(join(dest, 'README.md'), 'utf8'), '# Existing')
  })

  it('respects the ignore list', () => {
    writeFileSync(join(src, 'template.json'), '{}')
    writeFileSync(join(src, 'AGENTS.md'), '# Agents')

    const { created, skipped } = copyTemplate(src, dest, ['template.json'])

    assert.deepEqual(created, ['AGENTS.md'])
    assert.deepEqual(skipped, [])
    assert.ok(!existsSync(join(dest, 'template.json')))
  })

  it('creates dest directory if it does not exist', () => {
    const newDest = join(dest, 'subdir', 'nested')
    writeFileSync(join(src, 'file.txt'), 'content')

    copyTemplate(src, newDest)

    assert.ok(existsSync(join(newDest, 'file.txt')))
  })

  it('returns empty arrays for an empty template directory', () => {
    const { created, skipped } = copyTemplate(src, dest)
    assert.deepEqual(created, [])
    assert.deepEqual(skipped, [])
  })

  it('throws when source directory does not exist', () => {
    assert.throws(() => copyTemplate('/nonexistent/src', dest), /not found/)
  })

  it('copies dotfiles and dotdirectories', () => {
    mkdirSync(join(src, '.claude'))
    writeFileSync(join(src, '.claude', 'settings.json'), '{}')

    const { created } = copyTemplate(src, dest)

    assert.ok(created.includes(join('.claude', 'settings.json')))
  })

  it('applies transform to file contents when provided', () => {
    writeFileSync(join(src, 'README.md'), 'Hello, {{name}}!')

    copyTemplate(src, dest, [], (content) => content.replace('{{name}}', 'World'))

    assert.equal(readFileSync(join(dest, 'README.md'), 'utf8'), 'Hello, World!')
  })
})
