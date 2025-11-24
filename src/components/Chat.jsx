import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChat } from '../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WelcomeMessage from './WelcomeMessage';

const Chat = () => {
  const {
    messages = [],
    isTyping = false,
    sendMessage,
    createNewChat,
    clearChat,
    loadChatHistory,
    setCurrentChatId,
  } = useChat();

  const location = useLocation();
  const { chatId } = location.state || {};

  useEffect(() => {
    if (chatId) {
      if (typeof setCurrentChatId === 'function') setCurrentChatId(chatId);
      if (typeof loadChatHistory === 'function') loadChatHistory(chatId);
    }
  }, [chatId, setCurrentChatId, loadChatHistory]);

  const [localMessages, setLocalMessages] = useState([]);

  useEffect(() => {
    setLocalMessages(messages);
  }, [messages]);

  const handleNewChat = () => {
    if (localMessages.length > 0) {
      if (window.confirm('Создать новый чат?')) {
        createNewChat?.();
        setLocalMessages([]);
      }
    } else {
      createNewChat?.();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Очистить историю чата?')) {
      clearChat?.();
      setLocalMessages([]);
    }
  };

  const handleSendMessage = (text) => {
    if (text.trim()) {
      sendMessage?.(text);
    }
  };

  return (
    <div className="chat-container">
      {/* Шапка чата */}
      <header className="chat-header">
        <div className="header-left">
          <button className="back-btn" onClick={() => window.history.back()}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5"/>
              <path d="M12 19l-7-7 7-7"/>
            </svg>
          </button>
          <div className="chat-title">
            <h1>{localMessages.length > 0 ? 'Чат с AI' : 'Новый чат'}</h1>
            <span className="chat-status">Онлайн</span>
          </div>
        </div>
        
        <div className="header-right">
          <button className="chat-action-btn" onClick={handleNewChat} title="Новый чат">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19"/>
              <line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
          </button>
          {localMessages.length > 0 && (
            <button className="chat-action-btn" onClick={handleClearChat} title="Очистить историю">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="3,6 5,6 21,6"/>
                <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"/>
                <line x1="10" y1="11" x2="10" y2="17"/>
                <line x1="14" y1="11" x2="14" y2="17"/>
              </svg>
            </button>
          )}
        </div>
      </header>

      {/* Область сообщений */}
      <main className="chat-messages">
        <div className="messages-container">
          {localMessages.length === 0 ? (
            <WelcomeMessage onSuggestionClick={handleSendMessage} />
          ) : (
            <MessageList messages={localMessages} />
          )}
        </div>
      </main>

      {/* Индикатор печати */}
      {isTyping && (
        <div className="typing-indicator">
          <div className="typing-avatar">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 12l2 2 4-4"/>
              <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.68 0 3.25.46 4.59 1.26"/>
            </svg>
          </div>
          <div className="typing-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <span className="typing-text">ИИ печатает...</span>
        </div>
      )}

      {/* Поле ввода */}
      <footer className="chat-input-section">
        <MessageInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </footer>
    </div>
  );
};

export default Chat;