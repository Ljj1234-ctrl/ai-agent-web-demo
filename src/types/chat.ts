export type Role = 'user' | 'assistant' | 'system' | 'tool';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  createdAt: string;
  /**
   * Optional status used for UI states such as 'streaming' or 'error'.
   */
  status?: 'pending' | 'streaming' | 'error' | 'done';
  /**
   * Optional error message when this message failed to send or render.
   */
  errorMessage?: string;
}

export type ScenarioId = 'qa' | 'retrieval' | 'tool';

export interface Scenario {
  id: ScenarioId;
  name: string;
  description: string;
  /**
   * Optional Coze bot id or configuration key for this scenario.
   */
  botId?: string;
  /**
   * Optional system instructions to prepend to the conversation.
   */
  systemPrompt?: string;
}

export interface AgentConfig {
  temperature: number;
  topP: number;
  /**
   * Optional max tokens or similar generation limit.
   */
  maxTokens?: number;
}

export interface CozeChatRequest {
  bot_id?: string;
  user_id: string;
  query: string;
  // Additional fields can be added as needed for your Coze bot.
  stream?: boolean;
}

export interface CozeMessage {
  role: Role;
  content: string;
}

export interface CozeChatResponse {
  messages: CozeMessage[];
}

