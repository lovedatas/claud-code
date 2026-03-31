import { createRequire } from 'module'

export type BrowserTool = {
  name: string
}

export type PermissionMode =
  | 'ask'
  | 'skip_all_permission_checks'
  | 'follow_a_plan'

export type Logger = {
  info(message: string): void
  warn(message: string): void
  error?(message: string): void
}

export type ClaudeForChromeContext = Record<string, unknown>

type ChromeRuntimeModule = {
  BROWSER_TOOLS?: BrowserTool[]
  createClaudeForChromeMcpServer?: (
    context: ClaudeForChromeContext,
  ) => Promise<unknown> | unknown
}

const require = createRequire(import.meta.url)

let cachedChromeRuntime: ChromeRuntimeModule | null | undefined

function loadChromeRuntime(): ChromeRuntimeModule | null {
  if (cachedChromeRuntime !== undefined) {
    return cachedChromeRuntime
  }

  try {
    cachedChromeRuntime =
      require('@ant/claude-for-chrome-mcp') as ChromeRuntimeModule
  } catch {
    cachedChromeRuntime = null
  }

  return cachedChromeRuntime
}

function createMissingChromePackageError(): Error {
  return new Error(
    'Claude in Chrome integration is unavailable because @ant/claude-for-chrome-mcp is not installed in this source snapshot.',
  )
}

export const BROWSER_TOOLS: BrowserTool[] =
  loadChromeRuntime()?.BROWSER_TOOLS ?? []

export function createClaudeForChromeMcpServer(
  context: ClaudeForChromeContext,
): Promise<unknown> | unknown {
  const runtime = loadChromeRuntime()
  if (!runtime?.createClaudeForChromeMcpServer) {
    throw createMissingChromePackageError()
  }
  return runtime.createClaudeForChromeMcpServer(context)
}
