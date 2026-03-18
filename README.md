# AI Agent 助手（Web Demo）

基于 React + TypeScript 实现的对话式助手 Web 前端 Demo，支持消息流展示、输入区、会话列表与简单配置面板，用于练习前端工程化与对话式界面设计。

界面结构：左侧为会话列表及配置区，右侧为聊天区域（消息列表 + 输入框）。当前使用前端模拟接口返回，并未接入真实大模型。

---

## 功能特性

- **会话管理**
  - 新建会话
  - 切换会话
  - 展示简单标题

- **消息展示**
  - 用户消息
  - 助手“回复”消息（本地模拟）
  - 错误消息（请求失败时插入）

- **消息发送**
  - 输入框 + 发送按钮
  - 回车发送（支持 Shift+Enter 换行）
  - 发送中禁用输入，展示 Loading 文案
  - 失败后在对话中插入错误提示

- **简单配置**
  - 在侧边栏配置系统提示词（只在前端保存）
  - 后续可扩展更多参数

- **异常兜底**
  - 模拟接口失败时的错误提示
  - 空对话时的引导文案

---

## 技术栈

- Vite + React + TypeScript
- 函数组件 + 自定义 Hooks
- 简单 CSS（Flex 布局）

---

## 目录结构

```text
ai-agent-web-demo/
  README.md
  package.json
  tsconfig.json
  vite.config.ts

  src/
    main.tsx
    app/
      App.tsx

    layout/
      ChatLayout.tsx

    features/
      conversations/
        useConversations.ts
        ConversationList.tsx

      chat/
        types.ts
        useMessages.ts
        useSendMessage.ts
        MessageList.tsx
        MessageItem.tsx
        Composer.tsx

      config/
        useChatConfig.ts
        ConfigPanel.tsx

    components/
      Empty.tsx
      Loading.tsx
      ErrorTip.tsx

    api/
      chat.ts

    styles/
      global.css
