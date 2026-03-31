import { z } from 'zod/v4'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'

const inputSchema = lazySchema(() => z.strictObject({}))
const outputSchema = lazySchema(() =>
  z.object({ message: z.string().describe('Recovery stub status') }),
)

export const SUGGEST_BACKGROUND_PR_TOOL_NAME = 'SuggestBackgroundPR'

export const SuggestBackgroundPRTool = buildTool({
  name: SUGGEST_BACKGROUND_PR_TOOL_NAME,
  description: async () =>
    'Recovered stub for the internal background PR suggestion tool',
  prompt: async () =>
    'This recovered source snapshot does not include the background PR suggestion flow.',
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
      'SuggestBackgroundPRTool is unavailable in this recovered source snapshot.',
    )
  },
} satisfies ToolDef)
