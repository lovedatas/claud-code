import React from 'react'
import { Box, Text } from '../ink.js'
import { Select } from '../components/CustomSelect/index.js'
import { Dialog } from '../components/design-system/Dialog.js'

type AssistantSessionLike = {
  id: string
  title?: string | null
  cwd?: string | null
  workingDirectory?: string | null
  updatedAt?: string | null
}

type Props = {
  sessions: AssistantSessionLike[]
  onSelect: (id: string) => void
  onCancel: () => void
}

function formatSessionLabel(session: AssistantSessionLike): React.ReactNode {
  const title = session.title?.trim() || `Session ${session.id.slice(0, 8)}`
  const cwd = session.cwd ?? session.workingDirectory

  return (
    <Box flexDirection="column">
      <Text bold>{title}</Text>
      <Text dimColor>{session.id}</Text>
      {cwd ? <Text dimColor>{cwd}</Text> : null}
      {session.updatedAt ? <Text dimColor>{session.updatedAt}</Text> : null}
    </Box>
  )
}

export function AssistantSessionChooser({
  sessions,
  onSelect,
  onCancel,
}: Props): React.ReactNode {
  return (
    <Dialog title="Choose Assistant Session" onCancel={onCancel}>
      <Text>Select a remote assistant session to attach to.</Text>
      <Select
        options={[
          ...sessions.map(session => ({
            label: formatSessionLabel(session),
            value: session.id,
          })),
          { label: 'Cancel', value: '__cancel__' },
        ]}
        onChange={value => {
          if (value === '__cancel__') {
            onCancel()
            return
          }
          onSelect(value)
        }}
      />
    </Dialog>
  )
}
