import type { Command } from '../../types/command.js'

const assistant = {
  type: 'local-jsx',
  name: 'assistant',
  description: 'Recovered stub for the assistant command',
  isEnabled: () => false,
  isHidden: true,
  load: () => import('./assistant.js'),
} satisfies Command

export default assistant
