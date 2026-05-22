import { parseArgs } from 'node:util'

const OPTIONS = {
  template: { type: 'string', short: 't' },
  output: { type: 'string', short: 'o' },
  force: { type: 'boolean', short: 'f' },
  help: { type: 'boolean', short: 'h' },
  version: { type: 'boolean', short: 'v' },
}

export const HELP_TEXT = `
Usage: create-ai-agents-docs [options]

Scaffold AI agent-friendly documentation into any repository.

Options:
  -t, --template <name|url|path>  Template to use (default: "default")
  -o, --output <dir>              Output directory (default: current directory)
  -f, --force                     Overwrite existing files
  -h, --help                      Show this help message
  -v, --version                   Show version number

Examples:
  npx create-ai-agents-docs
  npx create-ai-agents-docs --template default --output ./docs
  npx create-ai-agents-docs --template https://github.com/org/repo
  npx create-ai-agents-docs --template ./my-template --force
`.trim()

/**
 * @typedef {{ template: string | undefined, output: string | undefined, force: boolean, help: boolean, version: boolean, interactive: boolean }} CliArgs
 */

/**
 * @param {string[]} argv
 * @returns {CliArgs}
 */
export function parseCliArgs(argv = process.argv.slice(2)) {
  const { values } = parseArgs({ args: argv, options: OPTIONS, strict: true })
  const interactive =
    values.template === undefined &&
    values.output === undefined &&
    !values.force &&
    !values.help &&
    !values.version
  return {
    template: values.template,
    output: values.output,
    force: values.force ?? false,
    help: values.help ?? false,
    version: values.version ?? false,
    interactive,
  }
}
