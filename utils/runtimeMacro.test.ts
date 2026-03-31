import { afterEach, expect, test } from 'bun:test'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { pathToFileURL } from 'url'
import { getClaudeCodeVersion } from './version.js'
import './runtimeMacro.js'

const tempDirs: string[] = []

afterEach(() => {
  for (const dir of tempDirs.splice(0)) {
    rmSync(dir, { recursive: true, force: true })
  }
})

test('runtime macro shim exposes bare MACRO to imported modules', async () => {
  const dir = mkdtempSync(join(tmpdir(), 'runtime-macro-'))
  tempDirs.push(dir)

  const fixturePath = join(dir, 'fixture.mjs')
  writeFileSync(fixturePath, 'export const version = MACRO.VERSION;\n')

  const fixture = (await import(pathToFileURL(fixturePath).href)) as {
    version: string
  }

  expect(fixture.version).toBe(getClaudeCodeVersion())
})
