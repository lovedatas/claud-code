// Content for the verify bundled skill.
// Bun's text loader works for both direct source execution and bundling when
// we opt into it explicitly.

import cliMd from './verify/examples/cli.md' with { type: 'text' }
import serverMd from './verify/examples/server.md' with { type: 'text' }
import skillMd from './verify/SKILL.md' with { type: 'text' }

export const SKILL_MD: string = skillMd

export const SKILL_FILES: Record<string, string> = {
  'examples/cli.md': cliMd,
  'examples/server.md': serverMd,
}
