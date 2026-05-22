import { parseArgs } from 'node:util'

const OPTIONS = {
  template: { type: 'string', short: 't' },
  output: { type: 'string', short: 'o' },
}

/**
 * @typedef {{ template: string | undefined, output: string | undefined, interactive: boolean }} CliArgs
 */

/**
 * @param {string[]} argv
 * @returns {CliArgs}
 */
export function parseCliArgs(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: OPTIONS, strict: true })
  const interactive = values.template === undefined && values.output === undefined
  return {
    template: values.template,
    output: values.output,
    interactive,
  }
}
