import type { ChatMessage } from '../types/chat';
import { MessageCard } from './MessageCard';
import { useEffect, useRef } from 'react';

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
}

export function MessageList({ messages, isLoading }: MessageListProps) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages.length, isLoading]);

  if (messages.length === 0) {
    return (
      <div className="message-list message-list--empty">
        <p>开始与 AI 助手对话吧～</p>
        <p className="message-list__hint">
          右侧可以切换「问答 / 知识检索 / 工具调用」三种场景 Demo。
        </p>
      </div>
    );
  }

  return (
    <div className="message-list">
      {messages.map((msg) => (
        <MessageCard key={msg.id} message={msg} />
      ))}
      {isLoading && (
        <div className="message-list__loading-row">
          <div className="loading-dots">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}

