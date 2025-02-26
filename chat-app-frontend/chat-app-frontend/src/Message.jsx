import React from 'react';
import EmojiReaction from './EmojiReaction';

const Message = ({ msg }) => {
  const getTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
  };

  return (
    <div className={`message ${msg.sender === 'me' ? 'sent' : 'received'}`}>
      <img className="avatar" src={msg.avatar} alt="avatar" />
      {msg.text}
      <div className="timestamp">{getTime(new Date(msg.timestamp))}</div>
      <EmojiReaction messageId={msg.id} /> {/* Passing messageId as a prop */}
    </div>
  );
};

export default Message;
