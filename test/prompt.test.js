import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Readable, Writable } from 'node:stream'
import { promptText, promptSelect } from '../lib/prompt.js'

function makeInput(lines) {
  const readable = new Readable({ read() {} })
  for (const line of lines) {
    readable.push(`${line}\n`)
  }
  // Do not push null: readline closes via rl.close() once a valid answer is
  // received, so ending the stream early causes ERR_USE_AFTER_CLOSE on retry.
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

// ── promptText ──────────────────────────────────────────────────────────────

describe('promptText', () => {
  it('returns trimmed user input', async () => {
    const streams = { input: makeInput(['  hello  ']), output: makeOutput() }
    const result = await promptText('Your name', undefined, streams)
    assert.equal(result, 'hello')
  })

  it('returns default when user presses enter with no input', async () => {
    const streams = { input: makeInput(['']), output: makeOutput() }
    const result = await promptText('Your name', 'default-val', streams)
    assert.equal(result, 'default-val')
  })

  it('returns empty string when no default and user presses enter', async () => {
    const streams = { input: makeInput(['']), output: makeOutput() }
    const result = await promptText('Something', undefined, streams)
    assert.equal(result, '')
  })

  it('includes default hint in question when default is provided', async () => {
    const output = makeOutput()
    const streams = { input: makeInput(['']), output }
    await promptText('Your name', 'world', streams)
    assert.ok(output.getText().includes('(world)'), `expected "(world)" in: ${output.getText()}`)
  })

  it('does not include default hint when default is empty string', async () => {
    const output = makeOutput()
    const streams = { input: makeInput(['']), output }
    await promptText('Your name', '', streams)
    assert.ok(!output.getText().includes('()'), `unexpected "()" in: ${output.getText()}`)
  })
})

// ── promptSelect ────────────────────────────────────────────────────────────

describe('promptSelect', () => {
  it('returns value for a valid selection', async () => {
    const streams = { input: makeInput(['2']), output: makeOutput() }
    const choices = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ]
    const result = await promptSelect('Pick one', choices, streams)
    assert.equal(result, 'beta')
  })

  it('returns value for first choice when 1 is entered', async () => {
    const streams = { input: makeInput(['1']), output: makeOutput() }
    const choices = [{ label: 'Only', value: 'only' }]
    const result = await promptSelect('Pick one', choices, streams)
    assert.equal(result, 'only')
  })

  it('retries on invalid input then returns on valid input', async () => {
    const streams = { input: makeInput(['0', 'abc', '1']), output: makeOutput() }
    const choices = [
      { label: 'One', value: 'one' },
      { label: 'Two', value: 'two' },
    ]
    const result = await promptSelect('Pick one', choices, streams)
    assert.equal(result, 'one')
  })

  it('prints the message and all choices', async () => {
    const output = makeOutput()
    const streams = { input: makeInput(['1']), output }
    const choices = [
      { label: 'Alpha', value: 'alpha' },
      { label: 'Beta', value: 'beta' },
    ]
    await promptSelect('Choose template', choices, streams)
    const text = output.getText()
    assert.ok(text.includes('Choose template'), `missing message in: ${text}`)
    assert.ok(text.includes('1) Alpha'), `missing choice 1 in: ${text}`)
    assert.ok(text.includes('2) Beta'), `missing choice 2 in: ${text}`)
  })

  it('prints retry message on bad input', async () => {
    const output = makeOutput()
    const streams = { input: makeInput(['99', '1']), output }
    const choices = [{ label: 'A', value: 'a' }]
    await promptSelect('Pick', choices, streams)
    const text = output.getText()
    assert.ok(text.includes('Please enter a number'), `missing retry message in: ${text}`)
  })
})
