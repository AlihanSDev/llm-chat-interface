import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../common/BackgroundEffects';
import '../../styles/App.css';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="main-container">
      <BackgroundEffects />

      {/* hidden inputs to disable browser autofill (keeps HomePage parity) */}
      <input
        type="password"
        autoComplete="off"
        style={{ position: 'absolute', left: '-10000px', opacity: 0, height: 0, width: 0 }}
        tabIndex="-1"
      />
      <input
        type="text"
        autoComplete="off"
        style={{ position: 'absolute', left: '-10000px', opacity: 0, height: 0, width: 0 }}
        tabIndex="-1"
      />

      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            На главную
          </Link>
        </div>
        <div className="header-center">
          <h1 className="logo">COSMOCHAT AI</h1>
        </div>
        <div className="header-right">
          <Link to="/register" className="auth-link">Регистрация</Link>
        </div>
      </header>

      <main className="main-content">
        <div className="examples-section">
          {/* Left column: login card */}
          <div>
            <div className="auth-card">
              <div className="auth-header">
                <h2>Вход в систему</h2>
                <p>Добро пожаловать! Войдите в свой аккаунт для продолжения работы</p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Имя пользователя или Email</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input"
                    placeholder="Введите имя пользователя или email"
                    value={formData.username}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <div className="password-wrapper">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      className="form-input"
                      placeholder="Введите пароль"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-options">
                  <label className="checkbox-label">
                    <input
                      type="checkbox"
                      id="rememberMe"
                      name="rememberMe"
                      checked={formData.rememberMe}
                      onChange={handleChange}
                    />
                    <span className="checkbox-custom"></span>
                    Запомнить меня
                  </label>
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-full">Войти</button>
                </div>
              </form>

              <div className="auth-footer">
                <p>Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрироваться</Link></p>
              </div>
            </div>
          </div>

          {/* Right column: description card to match RegisterPage visuals */}
          <div>
            <div className="example-card">
              <div className="example-header">
                <h3>Добро пожаловать в AI Chat</h3>
              </div>
              <div className="example-content">
                <p>Используйте мощь искусственного интеллекта для общения, генерации идей и автоматизации задач. Быстро начните и исследуйте возможности.</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Link to="/register" className="auth-link">Зарегистрироваться</Link>
                  <Link to="/" className="auth-link">На главную</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;