import { z } from 'zod/v4'
import { buildTool, type ToolDef } from '../../Tool.js'
import { lazySchema } from '../../utils/lazySchema.js'
import { VERIFY_PLAN_EXECUTION_TOOL_NAME } from './constants.js'

const inputSchema = lazySchema(() => z.strictObject({}))
const outputSchema = lazySchema(() =>
  z.object({ message: z.string().describe('Recovery stub status') }),
)

export const VerifyPlanExecutionTool = buildTool({
  name: VERIFY_PLAN_EXECUTION_TOOL_NAME,
  description: async () =>
    'Recovered stub for the internal plan verification tool',
  prompt: async () =>
    'This recovered source snapshot does not include the plan verification implementation.',
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
      'VerifyPlanExecutionTool is unavailable in this recovered source snapshot.',
    )
  },
} satisfies ToolDef)
