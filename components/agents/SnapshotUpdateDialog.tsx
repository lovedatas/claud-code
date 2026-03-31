import React from 'react'
import { Text } from '../../ink.js'
import type { AgentMemoryScope } from '../../tools/AgentTool/agentMemory.js'
import { getMemoryScopeDisplay } from '../../tools/AgentTool/agentMemory.js'
import { Select } from '../CustomSelect/index.js'
import { Dialog } from '../design-system/Dialog.js'

type Props = {
  agentType: string
  scope: AgentMemoryScope
  snapshotTimestamp: string
  onComplete: (choice: 'merge' | 'keep' | 'replace') => void
  onCancel: () => void
}

export function buildMergePrompt(
  agentType: string,
  scope: AgentMemoryScope,
): string {
  return [
    `The ${agentType} agent has a pending memory snapshot update.`,
    `Memory scope: ${getMemoryScopeDisplay(scope)}.`,
    'Review the latest snapshot and merge the useful changes into the active context before proceeding.',
  ].join(' ')
}

export function SnapshotUpdateDialog({
  agentType,
  scope,
  snapshotTimestamp,
  onComplete,
  onCancel,
}: Props): React.ReactNode {
  return (
    <Dialog
      title="Agent Memory Snapshot"
      onCancel={onCancel}
      color="warning"
    >
      <Text>{agentType} has a pending memory snapshot update.</Text>
      <Text dimColor>Scope: {getMemoryScopeDisplay(scope)}</Text>
      <Text dimColor>Snapshot time: {snapshotTimestamp}</Text>
      <Select
        options={[
          { label: 'Merge snapshot guidance', value: 'merge' },
          { label: 'Keep current memory', value: 'keep' },
          { label: 'Replace current memory', value: 'replace' },
        ]}
        onChange={value =>
          onComplete(value as 'merge' | 'keep' | 'replace')
        }
      />
    </Dialog>
  )
}
