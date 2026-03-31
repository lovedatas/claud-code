# Missing Modules Recovery Spec

## Goal

让当前 `/Users/lifcc/Downloads/src` 这份不完整源码快照继续通过 `bun build ./main.tsx --outdir ./dist --packages external`，并且在缺失逻辑无法真实恢复时，显式返回“不可用”而不是伪装成功。

## Facts

- 当前目录是拆散后的源码快照，不是完整仓库。
- `/Users/lifcc/Desktop/code/AI/agent/open-claude-code` 是逆向分析仓，不是可直接复制的同版本 TS 源码树。
- `2.1.83` 的 `cli.js` 里确实包含缺失逻辑，但模块边界被 bundle 压平，无法直接整段回填。
- 第一轮构建最早卡住的是资源文件、常量模块、若干 UI/Tool 壳子，以及 compact 相关辅助模块。

## Recovery Strategy

1. 先补低风险资源和常量：
   - `skills/bundled/verify/*`
   - `ink/global.d.ts`
   - `ink/devtools.ts`
   - `tools/WorkflowTool/constants.ts`
   - `utils/protectedNamespace.ts`
   - `types/connectorText.ts`
2. 再补首批壳子模块：
   - `SnapshotUpdateDialog`
   - `AssistantSessionChooser`
   - `commands/assistant/*`
   - `commands/agents-platform/index.ts`
   - `TungstenTool`
   - `REPLTool`
   - `SuggestBackgroundPRTool`
   - `VerifyPlanExecutionTool`
3. compact 相关先做“显式 no-op”实现：
   - `cachedMicrocompact.ts`
   - `snipCompact.ts`
4. 每轮补完后重新执行构建，用新的真实报错决定第二轮范围。

## Guardrails

- 不改 `.env`、端口配置、登录态和远程配置。
- 不伪造成功行为；缺失实现统一返回明确的“当前恢复版源码未包含该能力”。
- 优先把壳子默认设为 `isEnabled() === false`，避免把半成品暴露给主流程。
