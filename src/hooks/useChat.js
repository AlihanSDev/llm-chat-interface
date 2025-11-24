import { useState, useEffect, useRef, useCallback } from 'react';

export const useChat = () => {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const [currentChatId, setCurrentChatId] = useState(null);
  const [settings, setSettings] = useState(() => ({
    defaultModel: 'katanemo/Arch-Router-1.5B:hf-inference',
    customApiKey: '',
    tokens: { hf: '', openai: '' },
    selectedToken: { provider: 'hf', source: 'user' },
    email: '',
    nickname: ''
  }));

  useEffect(() => {
    try {
      const raw = localStorage.getItem('app_settings');
      if (raw) {
        const parsed = JSON.parse(raw);
        setSettings(s => ({ ...s, ...parsed }));
        return;
      }

      const hf = localStorage.getItem('hf_token');
      if (hf) {
        setSettings(s => ({ ...s, customApiKey: hf, tokens: { ...s.tokens, hf } }));
      }
    } catch (e) {
    
    }
  }, []);

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

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isTyping) return;

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
      const provider = settings?.selectedToken?.provider || 'hf';
      const source = settings?.selectedToken?.source || 'user';
      const userToken = (settings && settings.tokens && settings.tokens[provider]) || settings.customApiKey || null;

      const useClientHF = provider === 'hf' && source === 'user' && userToken;

      if (useClientHF) {
        const hfKey = userToken || (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_HF_TOKEN) || null;
        try {
          const hfResp = await fetch('https://router.huggingface.co/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${hfKey}`
            },
            body: JSON.stringify({
              model: settings.defaultModel,
              messages: [
                { role: 'user', content }
              ]
            })
          });

          const hfData = await hfResp.json();

          const aiText = hfData?.choices?.[0]?.message?.content || hfData?.choices?.[0]?.message || hfData?.error || JSON.stringify(hfData);

          const aiMessage = {
            role: 'assistant',
            content: typeof aiText === 'string' ? aiText : JSON.stringify(aiText),
            timestamp: new Date().toISOString()
          };

          setMessages(prev => [...prev, aiMessage]);

          if (currentChatId) {
            await fetch(`/api/chats/${currentChatId}/messages`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ content: aiMessage.content, role: 'assistant' })
            });
          }
        } catch (hfError) {
          console.error('Ошибка при запросе к HuggingFace router:', hfError);
          throw hfError;
        }
      } else {
        const apiKeyToSend = (source === 'user' && userToken) ? userToken : settings.customApiKey;

        const response = await fetch('/api/llm/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            messages: [...messages, { role: 'user', content }],
            model: settings.defaultModel,
            apiKey: apiKeyToSend
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

  const clearChat = useCallback(() => {
    setMessages([]);
    setCurrentChatId(null);
  }, []);

  const saveSettings = useCallback(async (newSettings) => {
    setSettings(prev => ({ ...prev, ...newSettings }));

    try {
      try {
        const toStore = { ...newSettings };
        localStorage.setItem('app_settings', JSON.stringify(toStore));

        const hfToken = (newSettings.tokens && newSettings.tokens.hf) || newSettings.customApiKey || '';
        if (hfToken) localStorage.setItem('hf_token', hfToken);
        else localStorage.removeItem('hf_token');
      } catch (e) {
        
      }

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