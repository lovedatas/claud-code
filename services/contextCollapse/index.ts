import type { Message } from '../../types/message.js'
import type { ToolUseContext } from '../../Tool.js'
import type { QuerySource } from '../../constants/querySource.js'

type ContextCollapseHealth = {
  totalErrors: number
  totalEmptySpawns: number
  totalSpawns: number
  emptySpawnWarningEmitted: boolean
  lastError: string | null
}

export type ContextCollapseStats = {
  collapsedSpans: number
  collapsedMessages: number
  stagedSpans: number
  health: ContextCollapseHealth
}

type OverflowRecovery = {
  messages: Message[]
  committed: number
}

const listeners = new Set<() => void>()

const DEFAULT_STATS: ContextCollapseStats = {
  collapsedSpans: 0,
  collapsedMessages: 0,
  stagedSpans: 0,
  health: {
    totalErrors: 0,
    totalEmptySpawns: 0,
    totalSpawns: 0,
    emptySpawnWarningEmitted: false,
    lastError: null,
  },
}

let stats: ContextCollapseStats = structuredClone(DEFAULT_STATS)

function emit(): void {
  for (const listener of listeners) {
    listener()
  }
}

export function initContextCollapse(): void {
  resetContextCollapse()
}

export function resetContextCollapse(): void {
  stats = structuredClone(DEFAULT_STATS)
  emit()
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

export function getStats(): ContextCollapseStats {
  return stats
}

export function isContextCollapseEnabled(): boolean {
  return false
}

export async function applyCollapsesIfNeeded(
  messages: Message[],
  _toolUseContext?: ToolUseContext,
  _querySource?: QuerySource,
): Promise<{ messages: Message[] }> {
  return { messages }
}

export function isWithheldPromptTooLong(
  _message: Message,
  _isPromptTooLongMessage?: (message: Message) => boolean,
  _querySource?: QuerySource,
): boolean {
  return false
}

export function recoverFromOverflow(
  messages: Message[],
  _querySource?: QuerySource,
): OverflowRecovery {
  return {
    messages,
    committed: 0,
  }
}
