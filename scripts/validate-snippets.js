#!/usr/bin/env node
// @ts-check

import fs from "node:fs"
import path from "node:path"
import glob from "fast-glob"
import { parse } from "graphql"
import { fileURLToPath } from "node:url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const projectRoot = path.resolve(__dirname, "../")

/** @type {string} Glob pattern for MDX files to validate */
const MDX_GLOB = "./src/pages/learn/**/*.mdx"
/** @type {RegExp} Regex to match code blocks in markdown */
const CODE_BLOCK_REGEX = /^(`{3,})(\w+)\s*\n([\s\S]*?)\r?\n\1$/gm
/** @type {string} Comment to ignore code snippets */
const IGNORE_COMMENT = "snippet-ignore"

/** @type {number} */
let totalFiles = 0
/** @type {number} */
let totalSnippets = 0
/** @type {number} */
let totalErrors = 0

/**
 * @typedef {{ message: string }} ParseError
 */

/**
 * @param {string} code
 * @returns {ParseError[]}
 */
function validateGraphQL(code) {
  try {
    parse(code)
    return []
  } catch (error) {
    return [{ message: error instanceof Error ? error.message : String(error) }]
  }
}

/**
 * @typedef {{
 *   lang: string,
 *   code: string,
 *   lineNumber: number,
 *   filePath: string
 * }} Snippet

/**
 * Extracts code snippets from MDX content
 * @param {string} content - The MDX file content
 * @param {string} filePath - The path to the file being processed
 * @returns {Snippet[]} Array of extracted code snippets
 */
function extractSnippets(content, filePath) {
  const snippets = []
  let match

  while ((match = CODE_BLOCK_REGEX.exec(content)) !== null) {
    const [fullMatch, openingBackticks, lang, code] = match
    const beforeBlock = content.slice(0, match.index)
    const lineNumber = beforeBlock.split(/\r?\n/).length

    if (beforeBlock.includes(IGNORE_COMMENT)) {
      continue
    }

    snippets.push({ lang, code, lineNumber, filePath })
  }

  return snippets
}

/**
 * @typedef {{
 *   type: string,
 *   file: string,
 *   line: number,
 *   message: string
 * }} ValidationError
 */

/**
 * @param {Snippet} snippet - The code snippet to validate
 * @returns {Promise<ValidationError[]>} Array of validation errors
 */
async function validateSnippet(snippet) {
  const { lang, code, lineNumber, filePath } = snippet

  if (!code.trim()) return []

  if (lang === "graphql") {
    const messages = validateGraphQL(code)
    return messages.map(msg => ({
      type: "GraphQL",
      file: filePath,
      line: lineNumber,
      message: msg.message,
    }))
  }

  return []
}

/**
 * @returns {Promise<void>}
 */
async function main() {
  console.log(`Validating code snippets in: ${MDX_GLOB}`)

  const files = glob.sync(MDX_GLOB, { cwd: projectRoot })
  totalFiles = files.length

  if (totalFiles === 0) {
    console.log("No MDX files found to validate.")
    return
  }

  const errors = []

  for (const file of files) {
    const content = fs.readFileSync(file, "utf8")
    const snippets = extractSnippets(content, file)
    totalSnippets += snippets.length

    for (const snippet of snippets) {
      const snippetErrors = await validateSnippet(snippet)
      errors.push(...snippetErrors)
    }
  }

  totalErrors = errors.length

  if (totalErrors > 0) {
    errors.forEach(err => {
      const errorMessage = `${err.type} Error in ${err.file} at line ${err.line}: ${err.message}`
      console.error(errorMessage)

      if (process.env.GITHUB_ACTIONS) {
        console.log(`::error file=${err.file},line=${err.line}::${err.message}`)
      }
    })

    console.error("\nCode snippet validation failed. Check error logs.")
    console.error(`Files checked: ${totalFiles}`)
    console.error(`Snippets checked: ${totalSnippets}`)
    console.error(`Errors found: ${totalErrors}`)
    process.exit(1)
  } else {
    console.log(
      "\n✅ Code snippet validation passed. All code snippets are valid.",
    )
    console.log(`Files checked: ${totalFiles}`)
    console.log(`Snippets checked: ${totalSnippets}`)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
