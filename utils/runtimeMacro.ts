import packageJson from '../package.json' with { type: 'json' }

type RuntimeMacro = {
  VERSION: string
  PACKAGE_URL: string
  NATIVE_PACKAGE_URL: string | null
  VERSION_CHANGELOG: string
  FEEDBACK_CHANNEL: string
}

const DEFAULT_PACKAGE_URL = '@anthropic-ai/claude-code'
const DEFAULT_FEEDBACK_CHANNEL = '#claude-code'

function buildRuntimeMacro(): RuntimeMacro {
  const packageName =
    typeof packageJson.name === 'string' && packageJson.name.length > 0
      ? packageJson.name
      : DEFAULT_PACKAGE_URL
  const version =
    typeof packageJson.version === 'string' && packageJson.version.length > 0
      ? packageJson.version
      : 'unknown'

  return {
    VERSION: version,
    PACKAGE_URL: packageName,
    NATIVE_PACKAGE_URL: null,
    VERSION_CHANGELOG: '',
    FEEDBACK_CHANNEL: DEFAULT_FEEDBACK_CHANNEL,
  }
}

export function ensureRuntimeMacro(): void {
  const globalWithMacro = globalThis as typeof globalThis & {
    MACRO?: RuntimeMacro
  }

  if (globalWithMacro.MACRO) {
    return
  }

  globalWithMacro.MACRO = buildRuntimeMacro()
  ;(0, eval)('var MACRO = globalThis.MACRO')
}

ensureRuntimeMacro()
