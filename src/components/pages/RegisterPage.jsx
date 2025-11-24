import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import BackgroundEffects from '../common/BackgroundEffects';

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
    <div className="main-container overflow-hidden bg-gradient-to-br from-primary-50 to-background min-h-screen flex flex-col items-center justify-center p-4">
      <BackgroundEffects />

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
          <Link to="/login" className="auth-link">Войти</Link>
        </div>
      </header>

      <div className="relative w-full max-w-6xl">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
        <div className="absolute -bottom-40 -left-20 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left column: Form */}
          <div className="max-w-md w-full mx-auto">
            <div className="bg-card border rounded-xl shadow-sm p-6 md:p-8">
              <div className="auth-header">
                <h2 className="text-2xl font-semibold">Создание аккаунта</h2>
                <p className="mt-2 text-sm text-muted-foreground">Присоединяйтесь к AI Chat и начните общение с искусственным интеллектом</p>
              </div>

              <form className="mt-6" onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="username" className="block text-sm font-medium">Имя пользователя</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-input mt-2 w-full"
                    placeholder="Введите имя пользователя"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    minLength="3"
                  />
                  <div className="text-xs text-muted-foreground mt-1">Минимум 3 символа</div>
                </div>

                <div className="mb-4">
                  <label htmlFor="email" className="block text-sm font-medium">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-input mt-2 w-full"
                    placeholder="Введите ваш email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label htmlFor="password" className="block text-sm font-medium">Пароль</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    className="form-input mt-2 w-full"
                    placeholder="Создайте надежный пароль"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirmPassword" className="block text-sm font-medium">Подтверждение пароля</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    className="form-input mt-2 w-full"
                    placeholder="Повторите пароль"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-full w-full">
                  <span className="btn-text">Создать аккаунт</span>
                </button>
              </form>

              <div className="auth-footer mt-6 text-center text-sm">
                <p>Уже есть аккаунт? <Link to="/login" className="auth-link">Войти</Link></p>
              </div>
            </div>
          </div>

          {/* Right column: Illustration / Description */}
          <div className="flex items-center justify-center">
            <div className="prose max-w-lg text-center">
              <h3 className="text-2xl font-semibold">Добро пожаловать в AI Chat</h3>
              <p className="mt-4 text-sm text-muted-foreground">Используйте мощь искусственного интеллекта для общения, генерации идей и автоматизации задач. Быстро начните и исследуйте возможности.</p>
              <div className="mt-6 flex justify-center space-x-3">
                <Link to="/login" className="auth-link">Войти</Link>
                <Link to="/" className="auth-link">На главную</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;