import React from 'react';
import Message from './Message';

const MessageList = ({ messages }) => {
  return (
    <>
      {messages.map((message, index) => (
        <Message 
          key={index} 
          message={message} 
        />
      ))}
    </>
  );
};

export default MessageList;