import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parseCliArgs } from '../lib/cli.js'

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

  it('throws on unknown flags', () => {
    assert.throws(() => parseCliArgs(['--unknown']), /unknown/)
  })
})
