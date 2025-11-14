import { useState, useEffect, useRef, useCallback } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [settings, setSettings] = useState({
    defaultModel: 'katanemo/Arch-Router-1.5B:hf-inference',
    customApiKey: ''
  });

  // Загрузка истории чата
  const loadChatHistory = useCallback(async (chatId) => {
    if (!chatId || chatId.startsWith('temp_')) return;
    
    try {
      const response = await fetch(`/api/chats/${chatId}/messages`);
      const chatMessages = await response.json();
      
      if (Array.isArray(chatMessages)) {
        setMessages(chatMessages);
      }
    } catch (error) {
      console.error('Ошибка загрузки истории чата:', error);
    }
  }, []);

  // Отправка сообщения
  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isTyping) return;

    // Добавляем сообщение пользователя
    const userMessage = {
      role: 'user',
      content: content,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      if (currentChatId) {
        await fetch(`/api/chats/${currentChatId}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content, role: 'user' })
        });
      }

      const response = await fetch('/api/llm/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, { role: 'user', content }],
          model: settings.defaultModel,
          apiKey: settings.customApiKey
        })
      });

      const data = await response.json();
      
      if (data.success) {
        const aiMessage = {
          role: 'assistant',
          content: data.response,
          timestamp: new Date().toISOString()
        };
        
        setMessages(prev => [...prev, aiMessage]);
        
        if (currentChatId) {
          await fetch(`/api/chats/${currentChatId}/messages`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: data.response, role: 'assistant' })
          });
        }
      } else {
        throw new Error(data.error || 'Неизвестная ошибка');
      }
    } catch (error) {
      console.error('Ошибка отправки сообщения:', error);
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: `Извините, произошла ошибка: ${error.message}`,
        timestamp: new Date().toISOString(),
        isError: true
      }]);
    } finally {
      setIsTyping(false);
    }
  }, [messages, isTyping, currentChatId, settings]);

  // Создание нового чата
  const createNewChat = useCallback(async () => {
    try {
      const response = await fetch('/api/chats', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: 'Новый чат',
          is_temporary: false
        })
      });
      
      const data = await response.json();
      
      if (data.success) {
        setCurrentChatId(data.chatId);
        setMessages([]);
        return data.chatId;
      }
    } catch (error) {
      console.error('Ошибка создания чата:', error);
    }
    return null;
  }, []);

  // Очистка чата
  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
  }, []);

  // Сохранение настроек
  const saveSettings = useCallback(async (newSettings) => {
    setSettings(newSettings);
    
    try {
      await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSettings)
      });
    } catch (error) {
      console.error('Ошибка сохранения настроек:', error);
    }
  }, []);

  return {
    messages,
    isTyping,
    currentChatId,
    settings,
    sendMessage,
    createNewChat,
    clearChat,
    loadChatHistory,
    saveSettings,
    setCurrentChatId
  };
};