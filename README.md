# AI Agent 助手（Web Demo）

基于 **Vite + React + TypeScript** 实现的对话式助手 Web 前端 Demo，支持消息流展示、输入区、会话列表与简单配置面板，用于练习前端工程化与对话式界面设计，以及 Coze 能力的前端接入方式。

界面结构：左侧为会话列表与场景选择，中间为聊天区域（消息列表 + 输入框），右侧为基础配置面板及错误提示。  
默认使用前端 Mock 模拟接口返回；配置 Coze Token 后，可直接调用真实 Coze Chat 接口。

---

## 功能特性

- **会话管理**
  - 支持多会话：新建会话 / 切换会话
  - 根据首条消息自动生成简易标题
  - 左侧列表展示最近一条消息预览

- **多场景 Demo**
  - 问答 Demo：通用问答
  - 知识检索 Demo：模拟知识库问答
  - 工具调用 Demo：偏工具编排 / 步骤型回答
  - 场景通过顶部 Chip 切换，可独立新建会话

- **消息展示**
  - 用户消息气泡（右侧）
  - 助手回复消息气泡（左侧）
  - 错误消息气泡（请求失败时插入，并带错误详情）

- **消息发送**
  - 输入框 + 发送按钮
  - Enter 发送，Shift+Enter 换行
  - 发送中禁用输入与按钮，并展示 Loading 动效
  - 失败后在对话中插入错误提示，同时在右侧配置面板展示最近错误

- **简单配置**
  - 右侧配置面板支持调节 `temperature` 与 `top_p`
  - 当前参数主要用于演示前端表单与状态管理，后续可扩展更多模型参数 / 系统提示词等

- **异常兜底**
  - 接口异常时展示友好错误提示
  - 空对话时展示引导文案，提示如何开始聊天和切换 Demo 场景

---

## 技术栈

- 构建工具：Vite
- 前端框架：React + TypeScript
- 状态管理：函数组件 + `useState` / `useMemo` / `useCallback`
- 接口封装：原生 `fetch` + 简单错误封装
- 样式：原生 CSS（Grid + Flex 布局），适配明暗主题

---

## 目录结构（简化版）

```text
aiagent-web-demo/
  package.json
  tsconfig.json
  vite.config.ts

  src/
    main.tsx
    App.tsx

    components/
      ChatLayout.tsx
      ConversationList.tsx
      MessageList.tsx
      MessageCard.tsx
      MessageInput.tsx
      ConfigPanel.tsx

    services/
      cozeClient.ts       # Coze Chat 接口封装（无 Token 时自动 Mock）

    types/
      chat.ts             # 消息结构 / 场景 / Coze 请求响应 类型定义

    scenarios.ts          # 问答 / 知识检索 / 工具调用 三个 Demo 场景配置

    App.css
    index.css
