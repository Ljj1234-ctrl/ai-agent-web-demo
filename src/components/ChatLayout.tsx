import { useMemo } from 'react';
import type { AgentConfig, ChatMessage, ScenarioId } from '../types/chat';
import { SCENARIOS } from '../scenarios';
import { ConversationList, type ConversationSummary } from './ConversationList';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ConfigPanel } from './ConfigPanel';

interface ChatLayoutProps {
  activeScenarioId: ScenarioId;
  onScenarioChange: (id: ScenarioId) => void;
  conversations: ConversationSummary[];
  activeConversationId: string;
  onConversationSelect: (id: string) => void;
  onNewConversation: (scenarioId: ScenarioId) => void;
  messages: ChatMessage[];
  isRequesting: boolean;
  onSendMessage: (content: string) => void;
  config: AgentConfig;
  onConfigChange: (cfg: AgentConfig) => void;
  lastError?: string | null;
}

export function ChatLayout({
  activeScenarioId,
  onScenarioChange,
  conversations,
  activeConversationId,
  onConversationSelect,
  onNewConversation,
  messages,
  isRequesting,
  onSendMessage,
  config,
  onConfigChange,
  lastError,
}: ChatLayoutProps) {
  const scenario = useMemo(
    () => SCENARIOS.find((s) => s.id === activeScenarioId) ?? SCENARIOS[0],
    [activeScenarioId],
  );

  return (
    <div className="app-shell">
      <ConversationList
        conversations={conversations}
        activeId={activeConversationId}
        activeScenarioId={activeScenarioId}
        onSelect={onConversationSelect}
        onNewConversation={onNewConversation}
        onScenarioChange={onScenarioChange}
      />

      <main className="chat-main">
        <header className="chat-main__header">
          <div>
            <h1 className="chat-main__title">AI Agent Web Demo</h1>
            <p className="chat-main__subtitle">
              使用 React + TypeScript 搭建的对话式助手页面，演示 Coze 能力的前端接入。
            </p>
          </div>
        </header>

        <section className="chat-main__body">
          <MessageList messages={messages} isLoading={isRequesting} />
        </section>

        <section className="chat-main__footer">
          <MessageInput disabled={isRequesting} onSend={onSendMessage} />
        </section>
      </main>

      <ConfigPanel
        scenario={scenario}
        config={config}
        onChange={onConfigChange}
        lastError={lastError}
      />
    </div>
  );
}

