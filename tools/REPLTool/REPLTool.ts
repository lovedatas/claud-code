import { z } from 'zod/v4'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'
import { REPL_TOOL_NAME } from './constants.js'

const inputSchema = lazySchema(() =>
  z.strictObject({
    prompt: z
      .string()
      .optional()
      .describe('Optional REPL prompt input for the recovered stub'),
  }),
)
const outputSchema = lazySchema(() =>
  z.object({ message: z.string().describe('Recovery stub status') }),
)

export const REPLTool = buildTool({
  name: REPL_TOOL_NAME,
  description: async () => 'Recovered stub for the internal REPL wrapper tool',
  prompt: async () =>
    'This recovered source snapshot does not include the internal REPL tool implementation.',
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
    throw new Error('REPLTool is unavailable in this recovered source snapshot.')
  },
} satisfies ToolDef)
