import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import "../../styles/style.css";

const Navigation = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [showSidebar, setShowSidebar] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <>
      <header className="top-header">
        <div className="header-left">
          <button className="menu-btn" onClick={() => setShowSidebar(true)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"/>
              <line x1="3" y1="12" x2="21" y2="12"/>
              <line x1="3" y1="18" x2="21" y2="18"/>
            </svg>
          </button>
        </div>
        
        <div className="header-center">
          <Link to="/" className="logo-link">
            <h1 className="logo">AI CHAT</h1>
          </Link>
        </div>
        
        <div className="header-right">
          {!user ? (
            <div className="auth-buttons">
              <Link to="/register" className="auth-link">Регистрация</Link>
              <Link to="/login" className="auth-link">Войти</Link>
            </div>
          ) : (
            <div className="user-menu">
              <button className="profile-btn" onClick={() => navigate('/profile')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                <span>{user.username}</span>
              </button>
              <button className="logout-btn" onClick={handleLogout} title="Выйти">
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

      {/* Боковое меню */}
      {showSidebar && (
        <div className="sidebar-overlay" onClick={() => setShowSidebar(false)}>
          <div className="sidebar" onClick={(e) => e.stopPropagation()}>
            <div className="sidebar-header">
              <h2>Меню</h2>
              <button className="close-sidebar" onClick={() => setShowSidebar(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
            
            <div className="sidebar-content">
              <nav className="sidebar-nav">
                <Link to="/" className="nav-item" onClick={() => setShowSidebar(false)}>
                  <span>🏠 Главная</span>
                </Link>
                {user && (
                  <>
                    <Link to="/chat" className="nav-item" onClick={() => setShowSidebar(false)}>
                      <span>💬 Мои чаты</span>
                    </Link>
                    <Link to="/profile" className="nav-item" onClick={() => setShowSidebar(false)}>
                      <span>👤 Профиль</span>
                    </Link>
                  </>
                )}
                {!user && (
                  <>
                    <Link to="/login" className="nav-item" onClick={() => setShowSidebar(false)}>
                      <span>🔑 Вход</span>
                    </Link>
                    <Link to="/register" className="nav-item" onClick={() => setShowSidebar(false)}>
                      <span>📝 Регистрация</span>
                    </Link>
                  </>
                )}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;