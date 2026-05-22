const RESET = '\x1b[0m'
const GREEN = '\x1b[32m'
const YELLOW = '\x1b[33m'
const CYAN = '\x1b[36m'
const DIM = '\x1b[2m'
const BOLD = '\x1b[1m'

const enabled = process.env.NO_COLOR === undefined && process.stdout.isTTY !== false

/** @param {string} s */
export const green = (s) => (enabled ? `${GREEN}${s}${RESET}` : s)
/** @param {string} s */
export const yellow = (s) => (enabled ? `${YELLOW}${s}${RESET}` : s)
/** @param {string} s */
export const cyan = (s) => (enabled ? `${CYAN}${s}${RESET}` : s)
/** @param {string} s */
export const dim = (s) => (enabled ? `${DIM}${s}${RESET}` : s)
/** @param {string} s */
export const bold = (s) => (enabled ? `${BOLD}${s}${RESET}` : s)
