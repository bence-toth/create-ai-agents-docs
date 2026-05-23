import { createInterface, emitKeypressEvents } from 'node:readline'

/**
 * Creates a line reader that buffers incoming lines so they are never lost
 * between consecutive read calls.
 *
 * @param {NodeJS.ReadableStream} input
 * @param {NodeJS.WritableStream} output
 */
function createLineReader(input, output) {
  const rl = createInterface({ input, output, terminal: false })
  const queue = []
  let waiter = null

  rl.on('line', (line) => {
    if (waiter) {
      const resolve = waiter
      waiter = null
      resolve(line)
    } else {
      queue.push(line)
    }
  })

  return {
    readLine(prompt) {
      output.write(prompt)
      if (queue.length > 0) return Promise.resolve(queue.shift())
      return new Promise((resolve) => {
        waiter = resolve
      })
    },
    close() {
      rl.close()
    },
  }
}

/**
 * Prompts the user for a freeform text value.
 * Returns the default if the user enters an empty string.
 *
 * @param {string} message
 * @param {string} [defaultValue]
 * @param {{ input?: NodeJS.ReadableStream, output?: NodeJS.WritableStream }} [streams]
 * @returns {Promise<string>}
 */
export async function promptText(message, defaultValue, streams = {}) {
  const hint = defaultValue !== undefined && defaultValue !== '' ? ` (${defaultValue})` : ''
  const reader = createLineReader(streams.input ?? process.stdin, streams.output ?? process.stdout)
  try {
    const raw = await reader.readLine(`${message}${hint}: `)
    return raw.trim() || defaultValue || ''
  } finally {
    reader.close()
  }
}

/**
 * Presents a numbered list of choices and returns the selected item.
 * Falls back to number-entry mode when input is not a TTY.
 *
 * @param {string} message
 * @param {{ label: string, value: string }[]} choices
 * @param {{ input?: NodeJS.ReadableStream, output?: NodeJS.WritableStream }} [streams]
 * @returns {Promise<string>}
 */
export async function promptSelect(message, choices, streams = {}) {
  const input = streams.input ?? process.stdin
  const output = streams.output ?? process.stdout

  if (input.isTTY) {
    return promptSelectInteractive(message, choices, input, output)
  }
  return promptSelectNumeric(message, choices, input, output)
}

/**
 * @param {string} message
 * @param {{ label: string, value: string }[]} choices
 * @param {NodeJS.ReadableStream} input
 * @param {NodeJS.WritableStream} output
 * @returns {Promise<string>}
 */
function promptSelectNumeric(message, choices, input, output) {
  const reader = createLineReader(input, output)
  output.write(`${message}\n`)
  choices.forEach((choice, i) => {
    output.write(`  ${i + 1}) ${choice.label}\n`)
  })

  const ask = () =>
    reader.readLine(`Enter number (1-${choices.length}): `).then((raw) => {
      const n = parseInt(raw.trim(), 10)
      if (!isNaN(n) && n >= 1 && n <= choices.length) {
        reader.close()
        return choices[n - 1].value
      }
      output.write(`  Please enter a number between 1 and ${choices.length}.\n`)
      return ask()
    })

  return ask()
}

const CURSOR_UP = '\x1b[A'
const CURSOR_HIDE = '\x1b[?25l'
const CURSOR_SHOW = '\x1b[?25h'
const ERASE_LINE = '\x1b[2K\r'

/**
 * @param {string} message
 * @param {{ label: string, value: string }[]} choices
 * @param {NodeJS.ReadableStream & { setRawMode?: (raw: boolean) => void }} input
 * @param {NodeJS.WritableStream} output
 * @returns {Promise<string>}
 */
function promptSelectInteractive(message, choices, input, output) {
  return new Promise((resolve) => {
    let cursor = 0

    const renderLine = (i, isSelected) => {
      const pointer = isSelected ? '❯ ' : '  '
      const label = isSelected ? `\x1b[36m${choices[i].label}\x1b[0m` : choices[i].label
      return `${pointer}${label}\n`
    }

    const render = (isFirstRender) => {
      if (!isFirstRender) {
        // Move up to erase all choice lines
        for (let i = 0; i < choices.length; i++) {
          output.write(`${CURSOR_UP}${ERASE_LINE}`)
        }
      }
      for (let i = 0; i < choices.length; i++) {
        output.write(renderLine(i, i === cursor))
      }
    }

    output.write(CURSOR_HIDE)
    output.write(`${message}\n`)
    render(true)

    emitKeypressEvents(input)
    input.setRawMode?.(true)
    input.resume()

    const onKeypress = (_char, key) => {
      if (!key) return

      if (key.name === 'up' || (key.name === 'k' && !key.ctrl)) {
        cursor = (cursor - 1 + choices.length) % choices.length
        render(false)
      } else if (key.name === 'down' || (key.name === 'j' && !key.ctrl)) {
        cursor = (cursor + 1) % choices.length
        render(false)
      } else if (key.name === 'return' || key.name === 'enter') {
        input.setRawMode?.(false)
        input.pause()
        input.removeListener('keypress', onKeypress)
        output.write(CURSOR_SHOW)
        resolve(choices[cursor].value)
      } else if (key.ctrl && key.name === 'c') {
        input.setRawMode?.(false)
        output.write(CURSOR_SHOW)
        output.write('\n')
        process.exit(130)
      }
    }

    input.on('keypress', onKeypress)
  })
}
