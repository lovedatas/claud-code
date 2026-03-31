export type CacheEditDelete = {
  type: 'delete_tool_result'
  tool_use_id: string
}

export type CacheEditsBlock = {
  type: 'cache_edits'
  edits: CacheEditDelete[]
}

export type PinnedCacheEdits = {
  userMessageIndex: number
  block: CacheEditsBlock
}

export type CachedMCState = {
  toolOrder: string[]
  registeredTools: Set<string>
  deletedRefs: Set<string>
  pinnedEdits: PinnedCacheEdits[]
  toolMessageGroups: string[][]
  sentToApi: Set<string>
}

export type CachedMCConfig = {
  enabled: boolean
  supportedModels: string[]
  triggerThreshold: number
  keepRecent: number
}

const DEFAULT_CONFIG: CachedMCConfig = {
  enabled: false,
  supportedModels: [],
  triggerThreshold: 0,
  keepRecent: 0,
}

export function createCachedMCState(): CachedMCState {
  return {
    toolOrder: [],
    registeredTools: new Set(),
    deletedRefs: new Set(),
    pinnedEdits: [],
    toolMessageGroups: [],
    sentToApi: new Set(),
  }
}

export function resetCachedMCState(state: CachedMCState): void {
  state.toolOrder.length = 0
  state.registeredTools.clear()
  state.deletedRefs.clear()
  state.pinnedEdits.length = 0
  state.toolMessageGroups.length = 0
  state.sentToApi.clear()
}

export function markToolsSentToAPI(state: CachedMCState): void {
  for (const toolId of state.toolOrder) {
    state.sentToApi.add(toolId)
  }
}

export function isCachedMicrocompactEnabled(): boolean {
  return false
}

export function isModelSupportedForCacheEditing(_model: string): boolean {
  return false
}

export function getCachedMCConfig(): CachedMCConfig {
  return DEFAULT_CONFIG
}

export function registerToolResult(state: CachedMCState, toolUseId: string): void {
  if (state.registeredTools.has(toolUseId)) {
    return
  }
  state.registeredTools.add(toolUseId)
  state.toolOrder.push(toolUseId)
}

export function registerToolMessage(
  state: CachedMCState,
  toolUseIds: string[],
): void {
  if (toolUseIds.length === 0) {
    return
  }
  state.toolMessageGroups.push([...toolUseIds])
}

export function getToolResultsToDelete(_state: CachedMCState): string[] {
  return []
}

export function createCacheEditsBlock(
  _state: CachedMCState,
  toolUseIds: string[],
): CacheEditsBlock | null {
  if (toolUseIds.length === 0) {
    return null
  }

  return {
    type: 'cache_edits',
    edits: toolUseIds.map(tool_use_id => ({
      type: 'delete_tool_result',
      tool_use_id,
    })),
  }
}
