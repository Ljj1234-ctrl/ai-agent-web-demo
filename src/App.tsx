import { useCallback, useMemo, useState } from 'react'
import './App.css'
import type { AgentConfig, ChatMessage, ScenarioId } from './types/chat'
import { DEFAULT_SCENARIO_ID } from './scenarios'
import { ChatLayout } from './components/ChatLayout'
import { sendCozeChat } from './services/cozeClient'
import type { ConversationSummary } from './components/ConversationList'

interface ConversationState {
  id: string
  scenarioId: ScenarioId
  messages: ChatMessage[]
}

const createEmptyConfig = (): AgentConfig => ({
  temperature: 0.7,
  topP: 0.9,
})

const createUserMessage = (content: string): ChatMessage => ({
  id: `user-${Date.now()}`,
  role: 'user',
  content,
  createdAt: new Date().toISOString(),
  status: 'done',
})

const createAssistantMessage = (content: string): ChatMessage => ({
  id: `assistant-${Date.now()}`,
  role: 'assistant',
  content,
  createdAt: new Date().toISOString(),
  status: 'done',
})

function App() {
  const [activeScenarioId, setActiveScenarioId] =
    useState<ScenarioId>(DEFAULT_SCENARIO_ID)
  const [config, setConfig] = useState<AgentConfig>(createEmptyConfig)
  const [conversations, setConversations] = useState<ConversationState[]>([])
  const [activeConversationId, setActiveConversationId] = useState<string>('')
  const [isRequesting, setIsRequesting] = useState(false)
  const [lastError, setLastError] = useState<string | null>(null)

  const ensureActiveConversation = useCallback(
    (scenarioId: ScenarioId): string => {
      if (activeConversationId) return activeConversationId
      const id = `conv-${Date.now()}`
      setConversations([{ id, scenarioId, messages: [] }])
      setActiveConversationId(id)
      return id
    },
    [activeConversationId],
  )

  const handleScenarioChange = (id: ScenarioId) => {
    setActiveScenarioId(id)
  }

  const handleNewConversation = (scenarioId: ScenarioId) => {
    const id = `conv-${Date.now()}`
    setConversations((prev) => [
      { id, scenarioId, messages: [] },
      ...prev,
    ])
    setActiveConversationId(id)
  }

  const handleConversationSelect = (id: string) => {
    setActiveConversationId(id)
  }

  const handleSendMessage = async (content: string) => {
    setLastError(null)
    const scenarioId = activeScenarioId
    const convId = ensureActiveConversation(scenarioId)
    const userMsg = createUserMessage(content)

    setConversations((prev) =>
      prev.map((c) =>
        c.id === convId
          ? {
              ...c,
              messages: [...c.messages, userMsg],
            }
          : c,
      ),
    )

    setIsRequesting(true)
    try {
      const resp = await sendCozeChat({
        user_id: 'demo-user',
        query: content,
      })

      const assistantContent =
        resp.messages.find((m) => m.role === 'assistant')?.content ??
        '请求成功，但未返回可展示内容。'

      const assistantMsg = createAssistantMessage(assistantContent)

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [...c.messages, assistantMsg],
              }
            : c,
        ),
      )
    } catch (err) {
      const errorText =
        err instanceof Error ? err.message : '发送消息失败，请稍后重试。'
      setLastError(errorText)

      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        role: 'assistant',
        content: '请求 Coze 接口失败。',
        createdAt: new Date().toISOString(),
        status: 'error',
        errorMessage: errorText,
      }

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [...c.messages, errorMsg],
              }
            : c,
        ),
      )
    } finally {
      setIsRequesting(false)
    }
  }

  const activeMessages: ChatMessage[] = useMemo(() => {
    const conv =
      conversations.find((c) => c.id === activeConversationId) ??
      conversations[0]
    return conv?.messages ?? []
  }, [activeConversationId, conversations])

  const conversationSummaries: ConversationSummary[] = useMemo(
    () =>
      conversations.map((c) => {
        const last = c.messages[c.messages.length - 1]
        return {
          id: c.id,
          scenarioId: c.scenarioId,
          title:
            c.messages[0]?.content.slice(0, 10) ||
            (c.scenarioId === 'qa'
              ? '新建问答会话'
              : c.scenarioId === 'retrieval'
                ? '新建知识检索会话'
                : '新建工具调用会话'),
          lastMessage: last?.content,
        }
      }),
    [conversations],
  )

  return (
    <ChatLayout
      activeScenarioId={activeScenarioId}
      onScenarioChange={handleScenarioChange}
      conversations={conversationSummaries}
      activeConversationId={activeConversationId}
      onConversationSelect={handleConversationSelect}
      onNewConversation={handleNewConversation}
      messages={activeMessages}
      isRequesting={isRequesting}
      onSendMessage={handleSendMessage}
      config={config}
      onConfigChange={setConfig}
      lastError={lastError}
    />
  )
}

export default App
