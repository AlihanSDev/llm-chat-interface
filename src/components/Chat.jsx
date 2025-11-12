import React, { useState, useEffect } from 'react';
import { useChat } from '../hooks/useChat';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import WelcomeMessage from './WelcomeMessage';
import TypingIndicator from './TypingIndicator';

const Chat = ({ user }) => {
  const {
    messages,
    isTyping,
    currentChatId,
    settings,
    sendMessage,
    createNewChat,
    clearChat,
    loadChatHistory,
    setCurrentChatId
  } = useChat();

  const [showSettings, setShowSettings] = useState(false);

  // Загрузка чата при монтировании
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const chatId = urlParams.get('chatId');
    
    if (chatId) {
      setCurrentChatId(chatId);
      loadChatHistory(chatId);
    }
  }, [loadChatHistory, setCurrentChatId]);

  const handleNewChat = async () => {
    if (messages.length > 0) {
      if (window.confirm('Создать новый чат? Текущий диалог будет сохранен.')) {
        await createNewChat();
      }
    } else {
      await createNewChat();
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Вы уверены, что хотите очистить историю чата?')) {
      clearChat();
    }
  };

  return (
    <div className="chat-container">
      <header className="chat-header">
        <div className="chat-header-left">
          <button id="backBtn" className="btn btn-secondary" onClick={() => window.location.href = '/'}>
            Назад
          </button>
          <h2 id="chatTitle">
            {messages.length > 0 ? 'Диалог с AI' : 'Новый чат'}
          </h2>
        </div>
        
        <div className="chat-header-right">
          <span className="user-info">Пользователь: {user?.name}</span>
          <button className="btn btn-primary" onClick={handleNewChat}>
            Новый чат
          </button>
          <button className="btn btn-secondary" onClick={() => setShowSettings(true)}>
            Настройки
          </button>
          {messages.length > 0 && (
            <button className="btn btn-danger" onClick={handleClearChat}>
              Очистить
            </button>
          )}
        </div>
      </header>

      <div className="chat-messages" id="chatMessages">
        {messages.length === 0 && <WelcomeMessage onSuggestionClick={sendMessage} />}
        <MessageList messages={messages} />
        {isTyping && <TypingIndicator />}
      </div>

      <MessageInput 
        onSendMessage={sendMessage} 
        disabled={isTyping}
      />

      {showSettings && (
        <SettingsModal
          settings={settings}
          onSave={saveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
};

export default Chat;