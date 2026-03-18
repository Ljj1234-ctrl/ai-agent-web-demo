import type { CozeChatRequest, CozeChatResponse } from '../types/chat';

const DEFAULT_API_BASE = 'https://api.coze.cn';

const COZE_API_BASE =
  import.meta.env.VITE_COZE_API_BASE?.replace(/\/$/, '') || DEFAULT_API_BASE;

const COZE_API_TOKEN = import.meta.env.VITE_COZE_API_TOKEN;

if (import.meta.env.DEV && !COZE_API_TOKEN) {
  // eslint-disable-next-line no-console
  console.warn(
    '[cozeClient] Missing VITE_COZE_API_TOKEN, responses will be mocked in development.',
  );
}

export async function sendCozeChat(
  body: CozeChatRequest,
): Promise<CozeChatResponse> {
  // In dev without token, return a mocked assistant message so the UI works.
  if (!COZE_API_TOKEN) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    return {
      messages: [
        {
          role: 'assistant',
          content: `这是一个本地 Mock 的 Coze 响应。\n\n你发送的内容是：${body.query}`,
        },
      ],
    };
  }

  const res = await fetch(`${COZE_API_BASE}/v3/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${COZE_API_TOKEN}`,
    },
    body: JSON.stringify({
      ...body,
      stream: false,
    }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(
      `Coze API 请求失败: ${res.status} ${res.statusText} ${text}`,
    );
  }

  const data = (await res.json()) as CozeChatResponse;
  return data;
}

