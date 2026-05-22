import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parseCliArgs, HELP_TEXT } from '../lib/cli.js'

describe('parseCliArgs', () => {
  it('returns undefined template and output with interactive=true when no args given', () => {
    const result = parseCliArgs([])
    assert.equal(result.template, undefined)
    assert.equal(result.output, undefined)
    assert.equal(result.interactive, true)
  })

  it('parses --template', () => {
    const result = parseCliArgs(['--template', 'my-template'])
    assert.equal(result.template, 'my-template')
    assert.equal(result.interactive, false)
  })

  it('parses -t shorthand', () => {
    const result = parseCliArgs(['-t', 'my-template'])
    assert.equal(result.template, 'my-template')
    assert.equal(result.interactive, false)
  })

  it('parses --output', () => {
    const result = parseCliArgs(['--output', '/tmp/out'])
    assert.equal(result.output, '/tmp/out')
    assert.equal(result.interactive, false)
  })

  it('parses -o shorthand', () => {
    const result = parseCliArgs(['-o', '/tmp/out'])
    assert.equal(result.output, '/tmp/out')
    assert.equal(result.interactive, false)
  })

  it('parses --template and --output together', () => {
    const result = parseCliArgs(['--template', 'default', '--output', './docs'])
    assert.equal(result.template, 'default')
    assert.equal(result.output, './docs')
    assert.equal(result.interactive, false)
  })

  it('interactive is false when only --output is given', () => {
    const result = parseCliArgs(['--output', './docs'])
    assert.equal(result.interactive, false)
  })

  it('interactive is false when only --template is given', () => {
    const result = parseCliArgs(['--template', 'default'])
    assert.equal(result.interactive, false)
  })

  it('parses --force', () => {
    const result = parseCliArgs(['--force'])
    assert.equal(result.force, true)
    assert.equal(result.interactive, false)
  })

  it('parses -f shorthand', () => {
    const result = parseCliArgs(['-f'])
    assert.equal(result.force, true)
  })

  it('parses --help', () => {
    const result = parseCliArgs(['--help'])
    assert.equal(result.help, true)
    assert.equal(result.interactive, false)
  })

  it('parses -h shorthand', () => {
    const result = parseCliArgs(['-h'])
    assert.equal(result.help, true)
  })

  it('parses --version', () => {
    const result = parseCliArgs(['--version'])
    assert.equal(result.version, true)
    assert.equal(result.interactive, false)
  })

  it('parses -v shorthand', () => {
    const result = parseCliArgs(['-v'])
    assert.equal(result.version, true)
  })

  it('force defaults to false', () => {
    const result = parseCliArgs([])
    assert.equal(result.force, false)
  })

  it('help defaults to false', () => {
    const result = parseCliArgs([])
    assert.equal(result.help, false)
  })

  it('version defaults to false', () => {
    const result = parseCliArgs([])
    assert.equal(result.version, false)
  })

  it('HELP_TEXT contains usage info', () => {
    assert.ok(HELP_TEXT.includes('--template'))
    assert.ok(HELP_TEXT.includes('--output'))
    assert.ok(HELP_TEXT.includes('--force'))
    assert.ok(HELP_TEXT.includes('--help'))
    assert.ok(HELP_TEXT.includes('--version'))
  })

  it('throws on unknown flags', () => {
    assert.throws(() => parseCliArgs(['--unknown']), /unknown/)
  })
})
