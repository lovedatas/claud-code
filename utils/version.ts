import packageJson from '../package.json' with { type: 'json' }
import { readFileSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

let cachedVersion: string | undefined
const PACKAGE_JSON_VERSION =
  typeof packageJson.version === 'string' && packageJson.version.length > 0
    ? packageJson.version
    : undefined

function readPackageVersion(): string {
  if (cachedVersion) {
    return cachedVersion
  }

  if (PACKAGE_JSON_VERSION) {
    cachedVersion = PACKAGE_JSON_VERSION
    return cachedVersion
  }

  try {
    const here = dirname(fileURLToPath(import.meta.url))
    const pkgPath = join(here, '..', 'package.json')
    const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
      version?: unknown
    }
    cachedVersion =
      typeof pkg.version === 'string' && pkg.version.length > 0
        ? pkg.version
        : 'unknown'
  } catch {
    cachedVersion = 'unknown'
  }

  return cachedVersion
}

export function getClaudeCodeVersion(): string {
  return typeof MACRO !== 'undefined' && MACRO.VERSION
    ? MACRO.VERSION
    : readPackageVersion()
}
