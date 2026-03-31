import type { Command } from '../../types/command.js'

const agents_platform = {
  type: 'local',
  name: 'agents-platform',
  description: 'Recovered stub for the ant-only agents platform command',
  isEnabled: () => false,
  isHidden: true,
  supportsNonInteractive: true,
  async load() {
    return {
      call: async () => ({
        type: 'text' as const,
        value:
          'agents-platform is unavailable in this recovered external source snapshot.',
      }),
    }
  },
} satisfies Command

export default agents_platform
