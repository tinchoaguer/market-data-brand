import { execFileSync } from 'node:child_process'
import { appendFileSync, readFileSync } from 'node:fs'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const FEATURE_LIST_PATH = join(ROOT, 'work', 'feature_list.json')
const HISTORY_PREFIX = 'work/history/'

const BUMP_RANK = {
  none: 0,
  patch: 1,
  minor: 2,
  major: 3,
}

/**
 * @param {string} name
 * @param {string} value
 */
function setOutput(name, value) {
  const out = process.env.GITHUB_OUTPUT
  if (out) {
    appendFileSync(out, `${name}=${value}\n`)
  }
  console.log(`${name}=${value}`)
}

/**
 * @param {string[]} args
 */
function git(args) {
  return execFileSync('git', args, {
    cwd: ROOT,
    encoding: 'utf8',
  }).trim()
}

function main() {
  const before = process.env.BEFORE_SHA
  const after = process.env.AFTER_SHA

  if (!before || !after) {
    console.error('BEFORE_SHA and AFTER_SHA are required')
    process.exit(1)
  }

  // Zero SHA on new branch / first push — nothing to diff for Added history files.
  if (/^0+$/.test(before)) {
    setOutput('skip', 'true')
    return
  }

  let diff
  try {
    diff = git([
      'diff',
      '--name-only',
      '--diff-filter=A',
      before,
      after,
      '--',
      'work/history/',
    ])
  } catch (err) {
    console.error('git diff failed:', err instanceof Error ? err.message : err)
    process.exit(1)
  }

  const historyFiles = diff
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.startsWith(HISTORY_PREFIX) && line.endsWith('.md'))

  if (historyFiles.length === 0) {
    setOutput('skip', 'true')
    return
  }

  /** @type {Array<{ slug: string, bump_version?: string }>} */
  const features = JSON.parse(readFileSync(FEATURE_LIST_PATH, 'utf8'))
  const bySlug = new Map(features.map((f) => [f.slug, f]))

  /** @type {Array<'major' | 'minor' | 'patch' | 'none'>} */
  const bumps = []

  for (const file of historyFiles) {
    const slug = basename(file, '.md')
    const feature = bySlug.get(slug)
    if (!feature) {
      console.error(
        `Completed Feature "${slug}" has history at ${file} but is missing from work/feature_list.json`,
      )
      process.exit(1)
    }
    const bump = feature.bump_version
    if (bump == null || bump === '') {
      console.error(
        `Feature "${slug}" is missing required bump_version (major | minor | patch | none)`,
      )
      process.exit(1)
    }
    if (!(bump in BUMP_RANK)) {
      console.error(
        `Feature "${slug}" has invalid bump_version "${bump}" (expected major | minor | patch | none)`,
      )
      process.exit(1)
    }
    bumps.push(/** @type {'major' | 'minor' | 'patch' | 'none'} */ (bump))
    console.log(`history ${slug}: bump_version=${bump}`)
  }

  let strongest = /** @type {'major' | 'minor' | 'patch' | 'none'} */ ('none')
  for (const bump of bumps) {
    if (BUMP_RANK[bump] > BUMP_RANK[strongest]) {
      strongest = bump
    }
  }

  if (strongest === 'none') {
    setOutput('skip', 'true')
    return
  }

  setOutput('skip', 'false')
  setOutput('bump', strongest)
}

main()
