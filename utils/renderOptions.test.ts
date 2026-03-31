import { describe, expect, it } from 'bun:test'
import { buildInteractiveInputFailureMessage } from './renderOptions.js'

describe('buildInteractiveInputFailureMessage', () => {
  it('returns null when stdin is already a tty', () => {
    expect(
      buildInteractiveInputFailureMessage({
        stdinIsTTY: true,
        hasTtyOverride: false,
        term: 'xterm-256color',
      }),
    ).toBeNull()
  })

  it('returns null when /dev/tty fallback is available', () => {
    expect(
      buildInteractiveInputFailureMessage({
        stdinIsTTY: false,
        hasTtyOverride: true,
        term: 'xterm-256color',
      }),
    ).toBeNull()
  })

  it('includes TERM=dumb in the failure message when relevant', () => {
    expect(
      buildInteractiveInputFailureMessage({
        stdinIsTTY: false,
        hasTtyOverride: false,
        term: 'dumb',
      }),
    ).toContain('TERM=dumb')
  })
})
