import { createInterface } from 'node:readline'

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
 *
 * @param {string} message
 * @param {{ label: string, value: string }[]} choices
 * @param {{ input?: NodeJS.ReadableStream, output?: NodeJS.WritableStream }} [streams]
 * @returns {Promise<string>}
 */
export async function promptSelect(message, choices, streams = {}) {
  const output = streams.output ?? process.stdout
  const reader = createLineReader(streams.input ?? process.stdin, output)
  try {
    output.write(`${message}\n`)
    choices.forEach((choice, i) => {
      output.write(`  ${i + 1}) ${choice.label}\n`)
    })

    while (true) {
      const raw = await reader.readLine(`Enter number (1-${choices.length}): `)
      const n = parseInt(raw.trim(), 10)
      if (!isNaN(n) && n >= 1 && n <= choices.length) {
        return choices[n - 1].value
      }
      output.write(`  Please enter a number between 1 and ${choices.length}.\n`)
    }
  } finally {
    reader.close()
  }
}
