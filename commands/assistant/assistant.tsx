import { homedir } from 'os'
import { join } from 'path'
import * as React from 'react'
import { Text } from '../../ink.js'
import type { LocalJSXCommandCall } from '../../types/command.js'
import { Select } from '../../components/CustomSelect/index.js'
import { Dialog } from '../../components/design-system/Dialog.js'

type WizardProps = {
  defaultDir: string
  onInstalled: (dir: string) => void
  onCancel: () => void
  onError: (message: string) => void
}

const UNAVAILABLE_MESSAGE =
  '当前恢复版源码未包含 assistant 安装逻辑，无法在这个源码快照里完成安装。'

export async function computeDefaultInstallDir(): Promise<string> {
  return join(homedir(), '.claude', 'assistant')
}

export function NewInstallWizard({
  defaultDir,
  onInstalled,
  onCancel,
  onError,
}: WizardProps): React.ReactNode {
  return (
    <Dialog title="Assistant Install" onCancel={onCancel} color="warning">
      <Text>Assistant installer is unavailable in this recovered source snapshot.</Text>
      <Text dimColor>Suggested install dir: {defaultDir}</Text>
      <Select
        options={[
          { label: 'Close', value: 'cancel' },
          { label: 'Report unavailable', value: 'error' },
          { label: 'Use suggested path anyway', value: 'installed' },
        ]}
        onChange={value => {
          if (value === 'cancel') {
            onCancel()
            return
          }
          if (value === 'error') {
            onError(UNAVAILABLE_MESSAGE)
            return
          }
          onInstalled(defaultDir)
        }}
      />
    </Dialog>
  )
}

type CommandProps = {
  onDone: Parameters<LocalJSXCommandCall>[0]
}

function AssistantCommand({ onDone }: CommandProps): React.ReactNode {
  return (
    <NewInstallWizard
      defaultDir={join(homedir(), '.claude', 'assistant')}
      onInstalled={dir => onDone(`Assistant install target: ${dir}`)}
      onCancel={() => onDone('Assistant install cancelled', { display: 'system' })}
      onError={message => onDone(message, { display: 'system' })}
    />
  )
}

export const call: LocalJSXCommandCall = async onDone => {
  return <AssistantCommand onDone={onDone} />
}
