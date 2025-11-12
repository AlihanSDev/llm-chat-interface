import React, { useState } from 'react';
import { Link } from 'react-router-dom';

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
    // Здесь будет логика регистрации
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
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
          <Link to="/login" className="login-link-top">Войти</Link>
        </div>
      </header>

      {/* Центральная область */}
      <main className="auth-main">
        <div className="auth-card">
          <div className="auth-header">
            <h2>Создание аккаунта</h2>
            <p>Присоединяйтесь к AI Chat и начните общение с искусственным интеллектом</p>
          </div>
          
          <form className="auth-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Имя пользователя</label>
              <input 
                type="text" 
                id="username" 
                name="username"
                className="form-input" 
                placeholder="Введите имя пользователя"
                value={formData.username}
                onChange={handleChange}
                required
                minLength="3"
              />
              <div className="field-hint">Минимум 3 символа</div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email"
                className="form-input" 
                placeholder="Введите ваш email"
                value={formData.email}
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
                  placeholder="Создайте надежный пароль"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Подтверждение пароля</label>
              <div className="password-wrapper">
                <input 
                  type="password" 
                  id="confirmPassword" 
                  name="confirmPassword"
                  className="form-input" 
                  placeholder="Повторите пароль"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-full">
              <span className="btn-text">Создать аккаунт</span>
            </button>
          </form>

          <div className="auth-footer">
            <p>Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link></p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;