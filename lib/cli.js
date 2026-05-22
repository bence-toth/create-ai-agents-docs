import { parseArgs } from 'node:util'

const OPTIONS = {
  template: { type: 'string', short: 't', default: 'default' },
  output: { type: 'string', short: 'o', default: process.cwd() },
}

/**
 * @typedef {{ template: string, output: string }} CliArgs
 */

/**
 * @param {string[]} argv
 * @returns {CliArgs}
 */
export function parseCliArgs(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: OPTIONS, strict: true })
  return { template: values.template, output: values.output }
}
