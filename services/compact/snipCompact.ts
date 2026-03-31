import type { Message, SystemMessage } from '../../types/message.js'

export type SnipCompactResult = {
  messages: Message[]
  tokensFreed: number
  boundaryMessage?: SystemMessage
}

export function isSnipRuntimeEnabled(): boolean {
  return false
}

export function shouldNudgeForSnips(_messages: Message[]): boolean {
  return false
}

export function isSnipMarkerMessage(message: Message): boolean {
  return (
    message.type === 'system' &&
    'subtype' in message &&
    message.subtype === 'snip_marker'
  )
}

export function snipCompactIfNeeded(
  messages: Message[],
  _options?: { force?: boolean },
): SnipCompactResult {
  return {
    messages,
    tokensFreed: 0,
  }
}
