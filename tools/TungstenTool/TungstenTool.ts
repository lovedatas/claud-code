import { z } from 'zod/v4'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'

const inputSchema = lazySchema(() => z.strictObject({}))
const outputSchema = lazySchema(() =>
  z.object({ message: z.string().describe('Recovery stub status') }),
)

export const TUNGSTEN_TOOL_NAME = 'Tungsten'

export const TungstenTool = buildTool({
  name: TUNGSTEN_TOOL_NAME,
  description: async () =>
    'Recovered stub for the internal Tungsten terminal integration',
  prompt: async () =>
    'This recovered source snapshot does not include the Tungsten integration.',
  get inputSchema() {
    return inputSchema()
  },
  get outputSchema() {
    return outputSchema()
  },
  isEnabled() {
    return false
  },
  isReadOnly() {
    return true
  },
  isConcurrencySafe() {
    return true
  },
  maxResultSizeChars: 4096,
  async call() {
    throw new Error(
      'TungstenTool is unavailable in this recovered source snapshot.',
    )
  },
} satisfies ToolDef)

export function clearSessionsWithTungstenUsage(): void {}

export function resetInitializationState(): void {}
