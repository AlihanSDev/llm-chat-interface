import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../common/BackgroundEffects';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  useEffect(() => {
    setTimeout(() => {
      document.body.classList.add('loaded');
      document.querySelectorAll('.input-section, .examples-section').forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('content-loaded');
        }, index * 200);
      });
    }, 100);
  }, []);

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
          <Link to="/register" className="register-link-top">Регистрация</Link>
        </div>
      </header>

      <main className="main-content">
        <div className="input-section">
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

              <button type="submit" className="btn btn-primary btn-full">
                <span className="btn-text">Войти</span>
              </button>
            </form>

            <div className="auth-footer">
              <p>Нет аккаунта? <Link to="/register" className="auth-link">Зарегистрироваться</Link></p>
            </div>
          </div>
        </div>

        <div className="examples-section">
          <div className="example-card">
            <div className="example-header">
              <h3>💡 Советы</h3>
            </div>
            <div className="example-content">
              <p>Используйте AI CHAT для генерации идей, прототипов и анализа данных.</p>
            </div>
          </div>
          <div className="example-card">
            <div className="example-header">
              <h3>🔒 Безопасность</h3>
            </div>
            <div className="example-content">
              <p>Мы не храним ваши пароли в открытом виде. Войдите безопасно.</p>
            </div>
          </div>
          <div className="example-card">
            <div className="example-header">
              <h3>🚀 Начать</h3>
            </div>
            <div className="example-content">
              <p>Зарегистрируйтесь, чтобы получить больше возможностей.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;