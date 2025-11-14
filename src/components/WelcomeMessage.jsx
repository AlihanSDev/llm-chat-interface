import React from 'react';

const WelcomeMessage = ({ onSuggestionClick }) => {
  const suggestions = [
    "Расскажи о себе",
    "Помоги с программированием", 
    "Объясни сложную тему простыми словами"
  ];

  return (
    <div className="welcome-message" id="welcomeMessage">
      <div className="welcome-avatar">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 12l2 2 4-4"/>
          <path d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9c1.68 0 3.25.46 4.59 1.26"/>
          <path d="M21 3l-1-1"/>
          <path d="M3 21l-1-1"/>
          <path d="M21 21l-1-1"/>
          <path d="M3 3l-1-1"/>
        </svg>
      </div>
      <h2>Добро пожаловать в AI Chat!</h2>
      <p>Я готов помочь вам с любыми вопросами. Начните диалог, задав вопрос ниже.</p>
      <div className="suggestion-chips">
        {suggestions.map((suggestion, index) => (
          <div 
            key={index}
            className="chip" 
            onClick={() => onSuggestionClick(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WelcomeMessage;