import React from 'react';

const TypingIndicator = () => {
  return (
    <div className="message assistant typing-indicator">
      <div className="message-avatar">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.68 0 3.25.46 4.59 1.26"/>
        </svg>
      </div>
      <div className="message-content">
        <div className="typing-dots">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;