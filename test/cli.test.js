import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { parseCliArgs } from '../lib/cli.js'

describe('parseCliArgs', () => {
  it('returns defaults when no args given', () => {
    const result = parseCliArgs([])
    assert.equal(result.template, 'default')
    assert.equal(result.output, process.cwd())
  })

  it('parses --template', () => {
    const result = parseCliArgs(['--template', 'my-template'])
    assert.equal(result.template, 'my-template')
  })

  it('parses -t shorthand', () => {
    const result = parseCliArgs(['-t', 'my-template'])
    assert.equal(result.template, 'my-template')
  })

  it('parses --output', () => {
    const result = parseCliArgs(['--output', '/tmp/out'])
    assert.equal(result.output, '/tmp/out')
  })

  it('parses -o shorthand', () => {
    const result = parseCliArgs(['-o', '/tmp/out'])
    assert.equal(result.output, '/tmp/out')
  })

  it('parses --template and --output together', () => {
    const result = parseCliArgs(['--template', 'default', '--output', './docs'])
    assert.equal(result.template, 'default')
    assert.equal(result.output, './docs')
  })

  it('throws on unknown flags', () => {
    assert.throws(() => parseCliArgs(['--unknown']), /unknown/)
  })
})
