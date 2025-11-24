import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../common/BackgroundEffects';
import '../../styles/App.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Register data:', formData);
    // Здесь будет логика регистрации скоро
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          <h1 className="logo">AI CHAT</h1>
        </div>
        <div className="header-right">
          <Link to="/login" className="auth-link">Войти</Link>
        </div>
      </header>

      <main className="main-content">
        <div className="examples-section">
          {/* Left column: auth card (uses project's auth styles) */}
          <div>
            <div className="auth-card">
              <div className="auth-header">
                <h2>Создание аккаунта</h2>
                <p>Присоединяйтесь к AI Chat и начните общение с искусственным интеллектом</p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username">Имя пользователя</label>
                  <input
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Введите имя пользователя"
                    required
                    minLength={3}
                  />
                  <div className="field-hint">Минимум 3 символа</div>
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Введите ваш email"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Пароль</label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Создайте надежный пароль"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтверждение пароля</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Повторите пароль"
                    required
                  />
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-full">Создать аккаунт</button>
                </div>
              </form>

              <div className="auth-footer">
                <p>Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link></p>
              </div>
            </div>
          </div>

          {/* Right column: description card using example-card styles to match HomePage visuals */}
          <div>
            <div className="example-card">
              <div className="example-header">
                <h3>Добро пожаловать в AI Chat</h3>
              </div>
              <div className="example-content">
                <p>Используйте мощь искусственного интеллекта для общения, генерации идей и автоматизации задач. Быстро начните и исследуйте возможности.</p>
                <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                  <Link to="/login" className="auth-link">Войти</Link>
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

export default RegisterPage;