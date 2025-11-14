import React, { useEffect } from 'react';
import Chat from '../Chat';
import BackgroundEffects from '../common/BackgroundEffects';
import '../../styles/style.css';
import '../../styles/chat.css';

const ChatPage = () => {
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

  return (
    <div className="main-container">
      <BackgroundEffects />
      
      <input
        type="password"
        autoComplete="off"
        style={{
          position: 'absolute',
          left: '-10000px',
          opacity: 0,
          height: 0,
          width: 0,
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
          width: 0,
        }}
        tabIndex="-1"
      />

      <Chat />
    </div>
  );
};

export default ChatPage;