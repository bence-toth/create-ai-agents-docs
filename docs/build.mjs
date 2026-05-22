/**
 * Minimal static site generator for the docs site.
 * Converts Markdown files in docs/src/ to HTML in docs/dist/.
 * Uses only Node built-ins — no external dependencies.
 */

import { readFileSync, writeFileSync, mkdirSync, readdirSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)))
const SRC = join(ROOT, 'src')
const DIST = join(ROOT, 'dist')

/** Minimal Markdown → HTML converter (headings, code, tables, lists, inline). */
function mdToHtml(md) {
  const lines = md.split('\n')
  const out = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Fenced code block
    if (line.startsWith('```')) {
      const lang = line.slice(3).trim()
      const langAttr = lang ? ` class="language-${lang}"` : ''
      const codeLines = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(escape(lines[i]))
        i++
      }
      out.push(`<pre><code${langAttr}>${codeLines.join('\n')}</code></pre>`)
      i++
      continue
    }

    // Headings
    const heading = line.match(/^(#{1,6})\s+(.+)$/)
    if (heading) {
      const level = heading[1].length
      const text = inline(heading[2])
      const id = heading[2]
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
      out.push(`<h${level} id="${id}">${text}</h${level}>`)
      i++
      continue
    }

    // Table (detect by | at start/end or pipe-separated row)
    if (line.includes('|') && line.trim().startsWith('|')) {
      const tableLines = []
      while (i < lines.length && lines[i].includes('|') && lines[i].trim().startsWith('|')) {
        tableLines.push(lines[i])
        i++
      }
      out.push(renderTable(tableLines))
      continue
    }

    // Unordered list
    if (line.match(/^[-*]\s/)) {
      const items = []
      while (i < lines.length && lines[i].match(/^[-*]\s/)) {
        items.push(`<li>${inline(lines[i].replace(/^[-*]\s/, ''))}</li>`)
        i++
      }
      out.push(`<ul>\n${items.join('\n')}\n</ul>`)
      continue
    }

    // Ordered list
    if (line.match(/^\d+\.\s/)) {
      const items = []
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(`<li>${inline(lines[i].replace(/^\d+\.\s/, ''))}</li>`)
        i++
      }
      out.push(`<ol>\n${items.join('\n')}\n</ol>`)
      continue
    }

    // Blank line
    if (line.trim() === '') {
      i++
      continue
    }

    // Paragraph (collect until blank line or block element)
    const paraLines = []
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].startsWith('#') &&
      !lines[i].startsWith('```') &&
      !lines[i].match(/^[-*]\s/) &&
      !lines[i].match(/^\d+\.\s/) &&
      !(lines[i].includes('|') && lines[i].trim().startsWith('|'))
    ) {
      paraLines.push(lines[i])
      i++
    }
    if (paraLines.length) {
      out.push(`<p>${inline(paraLines.join(' '))}</p>`)
    }
  }

  return out.join('\n')
}

function escape(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}

function inline(s) {
  // Code spans
  s = s.replace(/`([^`]+)`/g, (_, c) => `<code>${escape(c)}</code>`)
  // Bold
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  // Italic
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>')
  // Links — convert .md refs to .html
  s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, href) => {
    const resolvedHref = href.replace(/\.md$/, '.html')
    return `<a href="${resolvedHref}">${text}</a>`
  })
  return s
}

function renderTable(lines) {
  const rows = lines
    .filter((l) => !l.match(/^\|[-| :]+\|$/))
    .map((l) =>
      l
        .trim()
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim()),
    )
  if (rows.length === 0) return ''
  const [head, ...body] = rows
  const ths = head.map((c) => `<th>${inline(c)}</th>`).join('')
  const trs = body
    .map((row) => `<tr>${row.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`)
    .join('\n')
  return `<table>\n<thead><tr>${ths}</tr></thead>\n<tbody>\n${trs}\n</tbody>\n</table>`
}

function titleFromMd(md) {
  const m = md.match(/^#\s+(.+)$/m)
  return m ? m[1] : 'create-ai-agents-docs'
}

function page(title, body, nav) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${escape(title)} — create-ai-agents-docs</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; }
    body { font-family: system-ui, sans-serif; line-height: 1.6; color: #1a1a1a; margin: 0; }
    a { color: #0070f3; text-decoration: none; }
    a:hover { text-decoration: underline; }
    nav { background: #0070f3; padding: 0.75rem 2rem; }
    nav a { color: #fff; font-weight: 600; margin-right: 1.5rem; }
    .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
    h1, h2, h3, h4 { line-height: 1.2; }
    h1 { margin-top: 0; }
    pre { background: #f4f4f5; border-radius: 6px; padding: 1rem; overflow-x: auto; }
    code { font-family: ui-monospace, monospace; font-size: 0.9em; }
    p code, li code { background: #f4f4f5; padding: 0.1em 0.3em; border-radius: 3px; }
    table { border-collapse: collapse; width: 100%; }
    th, td { border: 1px solid #e4e4e7; padding: 0.5rem 0.75rem; text-align: left; }
    th { background: #f4f4f5; }
    ul, ol { padding-left: 1.5rem; }
    footer { margin-top: 4rem; padding: 2rem; text-align: center; color: #71717a; font-size: 0.875rem; border-top: 1px solid #e4e4e7; }
  </style>
</head>
<body>
  <nav>${nav}</nav>
  <div class="container">
    ${body}
  </div>
  <footer>create-ai-agents-docs — MIT License</footer>
</body>
</html>`
}

mkdirSync(DIST, { recursive: true })

const files = readdirSync(SRC).filter((f) => f.endsWith('.md'))

const navLinks = files
  .map((f) => {
    const href = f.replace(/\.md$/, '.html')
    const label = f === 'index.md' ? 'Home' : titleFromMd(readFileSync(join(SRC, f), 'utf8'))
    return `<a href="${href}">${label}</a>`
  })
  .join('')

for (const file of files) {
  const md = readFileSync(join(SRC, file), 'utf8')
  const html = mdToHtml(md)
  const title = titleFromMd(md)
  const outFile = file.replace(/\.md$/, '.html')
  writeFileSync(join(DIST, outFile), page(title, html, navLinks))
  console.log(`  built: ${outFile}`)
}

console.log(`\nDone. ${files.length} page(s) written to docs/dist/`)
