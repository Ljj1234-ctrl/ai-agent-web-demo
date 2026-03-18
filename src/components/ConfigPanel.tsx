import type { AgentConfig, Scenario } from '../types/chat';

interface ConfigPanelProps {
  scenario: Scenario;
  config: AgentConfig;
  onChange: (cfg: AgentConfig) => void;
  lastError?: string | null;
}

export function ConfigPanel({
  scenario,
  config,
  onChange,
  lastError,
}: ConfigPanelProps) {
  return (
    <aside className="config-panel">
      <div className="config-panel__header">
        <h3>{scenario.name}</h3>
        <p>{scenario.description}</p>
      </div>

      <div className="config-panel__group">
        <label className="config-panel__label">
          温度 (temperature)
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={config.temperature}
            onChange={(e) =>
              onChange({
                ...config,
                temperature: Number(e.target.value),
              })
            }
          />
          <span className="config-panel__value">
            {config.temperature.toFixed(1)}
          </span>
        </label>
      </div>

      <div className="config-panel__group">
        <label className="config-panel__label">
          Top P
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={config.topP}
            onChange={(e) =>
              onChange({
                ...config,
                topP: Number(e.target.value),
              })
            }
          />
          <span className="config-panel__value">{config.topP.toFixed(1)}</span>
        </label>
      </div>

      {lastError && (
        <div className="config-panel__error">
          <div className="config-panel__error-title">最近一次请求出错</div>
          <div className="config-panel__error-body">{lastError}</div>
        </div>
      )}

      <div className="config-panel__helper">
        <p>
          这里仅演示前端参数组装与异常兜底。实际接入 Coze 时，可以在后端注入
          bot_id、工具配置等参数，实现更复杂的编排逻辑。
        </p>
      </div>
    </aside>
  );
}

