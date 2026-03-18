import type { Scenario, ScenarioId } from './types/chat';

export const SCENARIOS: Scenario[] = [
  {
    id: 'qa',
    name: '问答 Demo',
    description: '通用问答场景，适合快速对话、解释概念等。',
    systemPrompt: '你是一个通用中文 AI 助手，请用简洁清晰的方式回答用户问题。',
  },
  {
    id: 'retrieval',
    name: '知识检索 Demo',
    description: '模拟基于知识库的检索问答，适合 FAQ、文档问答。',
    systemPrompt:
      '你是一个知识检索助手，请优先基于已有知识进行回答，不要编造不存在的事实。',
  },
  {
    id: 'tool',
    name: '工具调用 Demo',
    description: '演示工具调用类场景（如计算、格式转换等）。',
    systemPrompt:
      '你是一个工具编排助手，请根据用户需求，给出有步骤、有结构的解决方案。',
  },
];

export const DEFAULT_SCENARIO_ID: ScenarioId = 'qa';

