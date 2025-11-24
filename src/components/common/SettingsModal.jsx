import React, { useState, useEffect } from 'react';
import '../../styles/components/settings-modal.css';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SettingsModal = ({ isOpen, onClose, settings, onSave }) => {
  const [local, setLocal] = useState({
    tokens: { hf: '', openai: '' },
    selectedToken: { provider: 'hf', source: 'user' },
    email: '',
    nickname: ''
  });

  const [errors, setErrors] = useState({});
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (settings) {
      setLocal(prev => ({ ...prev, ...(settings.tokens ? { tokens: settings.tokens } : {}), selectedToken: settings.selectedToken || prev.selectedToken, email: settings.email || '', nickname: settings.nickname || '' }));
      setVerified(false);
    }
  }, [settings, isOpen]);

  useEffect(() => {
    if (!isOpen) {
      setErrors({});
    }
  }, [isOpen]);

  const validate = () => {
    const e = {};
    if (local.email && !emailRegex.test(local.email)) e.email = 'Неверный формат email';
    if (!local.nickname || local.nickname.trim().length < 1) e.nickname = 'Никнейм обязателен';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = () => {
    if (!validate()) return;
    onSave({ ...settings, tokens: local.tokens, selectedToken: local.selectedToken, email: local.email, nickname: local.nickname });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="sm-modal-overlay" role="dialog" aria-modal="true">
      <div className="sm-modal">
        <div className="sm-header">
          <h2>Настройки</h2>
          <button className="sm-close" onClick={onClose} aria-label="Закрыть">✕</button>
        </div>

        <div className="sm-body">
          <section className="sm-section">
            <h3>API Tokens</h3>
            <div className="sm-row">
              <label>HuggingFace Token (user)</label>
              <input type="text" value={local.tokens.hf} onChange={(e) => setLocal(l => ({ ...l, tokens: { ...l.tokens, hf: e.target.value } }))} placeholder="hf_xxx..." />
            </div>
            <div className="sm-row">
              <label>OpenAI Token (user)</label>
              <input type="text" value={local.tokens.openai} onChange={(e) => setLocal(l => ({ ...l, tokens: { ...l.tokens, openai: e.target.value } }))} placeholder="sk-..." />
            </div>

            <div className="sm-row">
              <label>Use Token Source</label>
              <select value={local.selectedToken.source} onChange={(e) => setLocal(l => ({ ...l, selectedToken: { ...l.selectedToken, source: e.target.value } }))}>
                <option value="user">User-provided (client)</option>
                <option value="server">Server token (backend)</option>
              </select>
            </div>

            <div className="sm-row">
              <label>Provider</label>
              <select value={local.selectedToken.provider} onChange={(e) => setLocal(l => ({ ...l, selectedToken: { ...l.selectedToken, provider: e.target.value } }))}>
                <option value="hf">HuggingFace</option>
                <option value="openai">OpenAI</option>
              </select>
            </div>
          </section>

          <section className="sm-section">
            <h3>User Info</h3>
            <div className="sm-row">
              <label>Email</label>
              <input type="email" value={local.email} onChange={(e) => setLocal(l => ({ ...l, email: e.target.value }))} placeholder="you@example.com" />
              {errors.email && <div className="sm-error">{errors.email}</div>}
            </div>
            <div className="sm-row">
              <label>Nickname</label>
              <input type="text" value={local.nickname} onChange={(e) => setLocal(l => ({ ...l, nickname: e.target.value }))} placeholder="Nickname" />
              {errors.nickname && <div className="sm-error">{errors.nickname}</div>}
            </div>
            <div className="sm-row sm-verify">
              <button className="sidebar-action-btn" onClick={() => setVerified(v => !v)}>{verified ? 'Verified' : 'Verify'}</button>
              <span className="sm-verify-note">(verification stub)</span>
            </div>
          </section>
        </div>

        <div className="sm-footer">
          <button className="sidebar-action-btn secondary" onClick={onClose}>Отмена</button>
          <button className="sidebar-action-btn" onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
