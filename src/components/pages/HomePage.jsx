import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import BackgroundEffects from '../common/BackgroundEffects';
import '../../styles/App.css';
import { usePageTransition } from '../../hooks/usePageTransition';
import SettingsModal from '../common/SettingsModal';

const HomePage = () => {
  const { user, logout } = useAuth();
  const [message, setMessage] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const { createNewChat, sendMessage, settings, saveSettings } = useChat();

  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const { playEntry, playExit } = usePageTransition();

  useEffect(() => {
    playEntry();
  }, [playEntry]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    try {
      const newId = await createNewChat?.();
      setSidebarOpen(false);

      try {
        await playExit(500);
      } catch (e) {

      }

      if (newId) {
        navigate('/chat', { state: { chatId: newId } });
      } else {
        navigate('/chat');
      }

      
      await sendMessage?.(message);
    } catch (err) {
      console.error('Ошибка при создании чата / отправке сообщения:', err);
    } finally {
      setMessage('');
    }
  };

  const handleQuickAction = (action) => {
    const actionTexts = {
      'inspiration': 'Помоги мне найти вдохновение для...',
      'webapp': 'Создай веб-приложение для...',
      'mobile': 'Разработай мобильное приложение...',
      'data': 'Проанализируй данные и создай...',
      'creativity': 'Творческий проект на тему...'
    };
    
    setMessage(actionTexts[action] || '');
    document.querySelectorAll('.quick-action-btn').forEach(b => b.classList.remove('active'));
  
    try {
      
      const activeTarget = window.event?.target || null;
      if (activeTarget && activeTarget.classList) activeTarget.classList.add('active');
    } catch (e) {
      
    }
  };

  const toggleSidebar = () => setSidebarOpen(s => !s);
  const closeSidebar = () => setSidebarOpen(false);

  const handleExampleClick = (exampleText) => {
    setMessage(exampleText);
  };

  const handleSettingsClick = () => {
    console.log('Открыть настройки');
  };

  return (
    <div className="main-container">
      <BackgroundEffects />
      {/* Sidebar + overlay */}
      <div id="sidebar" className={`sidebar${sidebarOpen ? ' open' : ''}`} role="navigation" aria-hidden={!sidebarOpen}>
        <div className="sidebar-header">
          <h2>Меню</h2>
          <button className="close-sidebar" onClick={closeSidebar} aria-label="Закрыть меню">✕</button>
        </div>
        <div className="sidebar-content">
          <div className="sidebar-actions">
            <button className="sidebar-action-btn" onClick={async () => {
              const newId = await createNewChat?.();
              setSidebarOpen(false);
              try {
                await playExit(500);
              } catch (e) {
                
              }
              if (newId) {
                navigate('/chat', { state: { chatId: newId } });
              } else {
                navigate('/chat');
              }
            }}>Новый чат</button>
            <button className="sidebar-action-btn secondary">История</button>
            <button className="sidebar-action-btn" onClick={() => { setShowSettingsModal(s => !s); }} aria-expanded={showSettingsModal}>Настройки</button>
          </div>
          { /* Settings modal is rendered at top-level to overlay */ }
          <SettingsModal isOpen={showSettingsModal} onClose={() => setShowSettingsModal(false)} settings={settings} onSave={saveSettings} />

          <div className="chat-list">
            <div className="chat-item"><div className="chat-info"><div className="chat-title">Пример чата</div><div className="chat-time">сегодня</div></div><button className="chat-delete">Удалить</button></div>
          </div>
        </div>
      </div>
      {sidebarOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <input 
        type="password" 
        autoComplete="off" 
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          opacity: 0, 
          height: 0, 
          width: 0 
        }} 
        tabIndex="-1" 
      />
      <input 
        type="text" 
        autoComplete="off" 
        style={{ 
          position: 'absolute', 
          left: '-10000px', 
          opacity: 0, 
          height: 0, 
          width: 0 
        }} 
        tabIndex="-1" 
      />

      <header className="top-header">
        <div className="header-left">
          <button className="menu-btn" id="menuBtn" onClick={toggleSidebar} aria-expanded={sidebarOpen} aria-controls="sidebar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
        <div className="header-center">
          <h1 className="logo">COSMOCHAT AI</h1>
        </div>
        <div className="header-right">
          {!user ? (
            <div className="auth-buttons" id="authButtons">
              <Link to="/register" className="auth-link" id="registerLink">Регистрация</Link>
              <Link to="/login" className="auth-link" id="loginLink">Войти</Link>
            </div>
          ) : (
            <div className="user-menu" id="userMenu">
              <button className="profile-btn" id="profileBtn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span id="usernameDisplay">{user.username}</span>
              </button>
              <button className="logout-btn" id="logoutBtn" title="Выйти" onClick={logout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16,17 21,12 16,7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Центральная область */}
      <main className="main-content">
        {/* Поле ввода */}
        <div className="input-section">
          <div className="input-container" id="inputContainer">
            <div className="input-wrapper">
              <input 
                type="text" 
                id="messageInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Задайте мне любой вопрос..."
                className="message-input"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                data-lpignore="true"
                data-form-type="other"
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <div className="input-buttons">
                <button className="input-action-btn" id="settingsBtn" title="Настройки" onClick={handleSettingsClick}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="3"/>
                    <path d="m12 1 2.09 5.26L20 9.27l-4.5 1.5L13 19l-1-5.23L8 9.27l4.91-.01L12 1z"/>
                  </svg>
                </button>
                <button className="input-action-btn" id="sendBtn" title="Отправить" onClick={handleSendMessage}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="22" y1="2" x2="11" y2="13"/>
                    <polygon points="22,2 15,22 11,13 2,9 22,2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Быстрые кнопки */}
          <div className="quick-actions">
            <button className="quick-action-btn active" data-action="inspiration" onClick={(e) => { handleQuickAction('inspiration', e); e.currentTarget.classList.add('active'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <line x1="12" y1="8" x2="12" y2="12"/>
                <line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              Вдохновение
            </button>
            <button className="quick-action-btn" data-action="webapp" onClick={(e) => { handleQuickAction('webapp', e); e.currentTarget.classList.add('active'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
              Веб-приложение
            </button>
            <button className="quick-action-btn" data-action="mobile" onClick={(e) => { handleQuickAction('mobile', e); e.currentTarget.classList.add('active'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                <line x1="12" y1="18" x2="12.01" y2="18"/>
              </svg>
              Мобильное приложение
            </button>
            <button className="quick-action-btn" data-action="data" onClick={(e) => { handleQuickAction('data', e); e.currentTarget.classList.add('active'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.27,6.96 12,12.01 20.73,6.96"/>
                <line x1="12" y1="22.08" x2="12" y2="12"/>
              </svg>
              Анализ данных
            </button>
            <button className="quick-action-btn" data-action="creativity" onClick={(e) => { handleQuickAction('creativity', e); e.currentTarget.classList.add('active'); }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Творчество
            </button>
          </div>
        </div>

        {/* Примеры */}
        <div className="examples-section">
          <div className="example-card" onClick={() => handleExampleClick('Создай уникальный дизайн мобильного приложения для фитнеса с элементами геймификации')}>
            <div className="example-header">
              <h3>💡 Идеи для проекта</h3>
            </div>
            <div className="example-content">
              <p>Создай уникальный дизайн мобильного приложения для фитнеса с элементами геймификации</p>
            </div>
          </div>
          <div className="example-card" onClick={() => handleExampleClick('Разработай полнофункциональный веб-сайт на React с аутентификацией и базой данных')}>
            <div className="example-header">
              <h3>🚀 Техническая реализация</h3>
            </div>
            <div className="example-content">
              <p>Разработай полнофункциональный веб-сайт на React с аутентификацией и базой данных</p>
            </div>
          </div>
          <div className="example-card" onClick={() => handleExampleClick('Проанализируй продажи компании и создай интерактивную визуализацию с рекомендациями')}>
            <div className="example-header">
              <h3>📊 Анализ данных</h3>
            </div>
            <div className="example-content">
              <p>Проанализируй продажи компании и создай интерактивную визуализацию с рекомендациями</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;