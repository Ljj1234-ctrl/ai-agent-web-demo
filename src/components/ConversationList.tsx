import type { ScenarioId } from '../types/chat';
import { SCENARIOS } from '../scenarios';

export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage?: string;
  scenarioId: ScenarioId;
}

interface ConversationListProps {
  conversations: ConversationSummary[];
  activeId?: string;
  activeScenarioId: ScenarioId;
  onSelect: (id: string) => void;
  onNewConversation: (scenarioId: ScenarioId) => void;
  onScenarioChange: (scenarioId: ScenarioId) => void;
}

export function ConversationList({
  conversations,
  activeId,
  activeScenarioId,
  onSelect,
  onNewConversation,
  onScenarioChange,
}: ConversationListProps) {
  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h2 className="sidebar__title">AI Agent 助手</h2>
        <p className="sidebar__subtitle">三种典型业务场景 Demo</p>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <span>选择场景</span>
        </div>
        <div className="sidebar__scenario-list">
          {SCENARIOS.map((scenario) => (
            <button
              key={scenario.id}
              type="button"
              className={`chip ${scenario.id === activeScenarioId ? 'chip--active' : ''}`}
              onClick={() => onScenarioChange(scenario.id)}
            >
              {scenario.name}
            </button>
          ))}
        </div>
      </div>

      <div className="sidebar__section">
        <div className="sidebar__section-header">
          <span>会话列表</span>
          <button
            type="button"
            className="link-button"
            onClick={() => onNewConversation(activeScenarioId)}
          >
            新建会话
          </button>
        </div>
        {conversations.length === 0 ? (
          <div className="sidebar__empty">暂无会话，先发一条消息试试。</div>
        ) : (
          <ul className="conversation-list">
            {conversations.map((conv) => (
              <li key={conv.id}>
                <button
                  type="button"
                  className={`conversation-item ${
                    conv.id === activeId ? 'conversation-item--active' : ''
                  }`}
                  onClick={() => onSelect(conv.id)}
                >
                  <div className="conversation-item__title">{conv.title}</div>
                  {conv.lastMessage && (
                    <div className="conversation-item__preview">
                      {conv.lastMessage.slice(0, 40)}
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </aside>
  );
}

