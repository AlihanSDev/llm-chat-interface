import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/style.css';

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileData, setProfileData] = useState({
    full_name: '',
    bio: ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [emailData, setEmailData] = useState({
    newEmail: '',
    passwordForEmail: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Загрузка данных профиля
    loadProfileData();
  }, [user, navigate]);

  const loadProfileData = async () => {
    try {
      const response = await fetch('/api/auth-check');
      const data = await response.json();
      
      if (data.authenticated) {
        setProfileData({
          full_name: data.user.full_name || '',
          bio: data.user.bio || ''
        });
        setEmailData(prev => ({
          ...prev,
          newEmail: data.user.email || ''
        }));
      }
    } catch (error) {
      console.error('Ошибка загрузки профиля:', error);
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(profileData)
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Профиль успешно обновлен');
      } else {
        setMessage(data.error || 'Ошибка обновления профиля');
      }
    } catch (error) {
      setMessage('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          current_password: passwordData.currentPassword,
          new_password: passwordData.newPassword,
          confirm_password: passwordData.confirmPassword
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage('Пароль успешно изменен');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage(data.error || 'Ошибка изменения пароля');
      }
    } catch (error) {
      setMessage('Ошибка соединения с сервером');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  if (!user) {
    return <div>Загрузка...</div>;
  }

  return (
    <div className="main-container">
      {/* Звездный фон */}
      <div className="background-effects">
        <div className="stars">
          {[...Array(18)].map((_, i) => (
            <div key={i} className="star" style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`
            }}></div>
          ))}
        </div>
        
        <div className="cosmic-cloud cloud-1"></div>
        <div className="cosmic-cloud cloud-2"></div>
        <div className="cosmic-cloud cloud-3"></div>
        <div className="cosmic-cloud cloud-4"></div>
        
        <div className="glow-orb orb-1"></div>
        <div className="glow-orb orb-2"></div>
        <div className="glow-orb orb-3"></div>
        <div className="glow-orb orb-4"></div>
      </div>

      <header className="top-header">
        <div className="header-left">
          <Link to="/" className="back-btn" title="На главную">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7"/>
            </svg>
          </Link>
        </div>
        <div className="header-center">
          <h1 className="logo">Профиль</h1>
        </div>
        <div className="header-right">
          <button className="logout-btn" onClick={handleLogout} title="Выйти">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
              <polyline points="16,17 21,12 16,7"/>
              <line x1="21" y1="12" x2="9" y2="12"/>
            </svg>
          </button>
        </div>
      </header>

      <main className="profile-content">
        <div className="profile-container">
          {/* Аватар и основная информация */}
          <div className="profile-header">
            <div className="avatar-section">
              <div className="avatar-placeholder">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
              </div>
            </div>
            <div className="user-info">
              <h2 className="username">{user.username}</h2>
              <p className="email">{user.email}</p>
              <p className="full-name">{profileData.full_name || 'Не указано'}</p>
              <span className={`role-badge ${user.role}`}>
                {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
              </span>
            </div>
          </div>

          {/* Навигация по настройкам */}
          <div className="profile-navigation">
            <button 
              className={`nav-tab ${activeTab === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveTab('profile')}
            >
              Личные данные
            </button>
            <button 
              className={`nav-tab ${activeTab === 'security' ? 'active' : ''}`}
              onClick={() => setActiveTab('security')}
            >
              Безопасность
            </button>
            <button 
              className={`nav-tab ${activeTab === 'email' ? 'active' : ''}`}
              onClick={() => setActiveTab('email')}
            >
              Email
            </button>
          </div>

          {/* Формы настроек */}
          <div className="profile-forms">
            {/* Личные данные */}
            <div className={`form-tab ${activeTab === 'profile' ? 'active' : ''}`} id="profile-tab">
              <h3>Личные данные</h3>
              <form onSubmit={handleProfileUpdate}>
                <div className="form-group">
                  <label htmlFor="fullName">Полное имя</label>
                  <input 
                    type="text" 
                    id="fullName"
                    value={profileData.full_name}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      full_name: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Введите ваше полное имя"
                  />
                  <small className="form-help">Максимум 100 символов</small>
                </div>
                <div className="form-group">
                  <label htmlFor="bio">О себе</label>
                  <textarea 
                    id="bio"
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({
                      ...prev,
                      bio: e.target.value
                    }))}
                    className="form-input" 
                    rows="4" 
                    placeholder="Расскажите о себе..."
                  ></textarea>
                  <small className="form-help">Максимум 500 символов</small>
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Сохранение...' : 'Сохранить изменения'}
                  </button>
                </div>
              </form>
            </div>

            {/* Безопасность */}
            <div className={`form-tab ${activeTab === 'security' ? 'active' : ''}`} id="security-tab">
              <h3>Изменение пароля</h3>
              <form onSubmit={handlePasswordChange}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Текущий пароль</label>
                  <input 
                    type="password" 
                    id="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      currentPassword: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Введите текущий пароль"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">Новый пароль</label>
                  <input 
                    type="password" 
                    id="newPassword"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      newPassword: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Введите новый пароль"
                  />
                  <small className="form-help">Минимум 6 символов</small>
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Подтвердите новый пароль</label>
                  <input 
                    type="password" 
                    id="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({
                      ...prev,
                      confirmPassword: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Повторите новый пароль"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Изменение...' : 'Изменить пароль'}
                  </button>
                </div>
              </form>
            </div>

            {/* Email */}
            <div className={`form-tab ${activeTab === 'email' ? 'active' : ''}`} id="email-tab">
              <h3>Смена email</h3>
              <div className="email-status">
                <div className="verification-status">
                  <span className={`status-badge ${user.email_verified ? 'verified' : 'unverified'}`}>
                    {user.email_verified ? 'Подтвержден' : 'Не подтвержден'}
                  </span>
                </div>
              </div>
              <form>
                <div className="form-group">
                  <label htmlFor="newEmail">Новый email</label>
                  <input 
                    type="email" 
                    id="newEmail"
                    value={emailData.newEmail}
                    onChange={(e) => setEmailData(prev => ({
                      ...prev,
                      newEmail: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Введите новый email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="passwordForEmail">Подтвердите паролем</label>
                  <input 
                    type="password" 
                    id="passwordForEmail"
                    value={emailData.passwordForEmail}
                    onChange={(e) => setEmailData(prev => ({
                      ...prev,
                      passwordForEmail: e.target.value
                    }))}
                    className="form-input" 
                    placeholder="Введите текущий пароль"
                  />
                </div>
                <div className="form-actions">
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? 'Изменение...' : 'Изменить email'}
                  </button>
                </div>
              </form>
            </div>
          </div>

          {message && (
            <div className="notification-message">
              {message}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default ProfilePage;