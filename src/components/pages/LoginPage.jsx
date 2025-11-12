import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../common/BackgroundEffects';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    rememberMe: false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login data:', formData);
    // Здесь будет логика входа
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <div className="auth-container">
      {/* Верхняя панель */}
      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="back-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
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

      {/* Центральная область */}
      <main className="auth-main">
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
      </main>
    </div>
  );
};

export default LoginPage;