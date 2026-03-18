import type { ChatMessage } from '../types/chat';

interface MessageCardProps {
  message: ChatMessage;
}

export function MessageCard({ message }: MessageCardProps) {
  const isUser = message.role === 'user';
  const isError = message.status === 'error';

  return (
    <div
      className={`message-card ${isUser ? 'message-card--user' : 'message-card--assistant'} ${
        isError ? 'message-card--error' : ''
      }`}
    >
      <div className="message-card__avatar">
        {isUser ? <span>你</span> : <span>AI</span>}
      </div>
      <div className="message-card__body">
        <div className="message-card__meta">
          <span className="message-card__role">
            {isUser ? '用户' : '助手'}
          </span>
          <span className="message-card__time">
            {new Date(message.createdAt).toLocaleTimeString()}
          </span>
        </div>
        <div className="message-card__content">
          {message.content.split('\n').map((line, idx) => (
            <p key={idx}>{line}</p>
          ))}
        </div>
        {isError && message.errorMessage && (
          <div className="message-card__error">{message.errorMessage}</div>
        )}
      </div>
    </div>
  );
}

