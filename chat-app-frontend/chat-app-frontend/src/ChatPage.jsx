import React, { useState, useEffect } from 'react';
import './ChatPage.css'; // Import the updated CSS

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = () => {
        if (messageInput.trim()) {
            const newMessage = {
                user: 'You',
                message: messageInput,
                timestamp: new Date().toLocaleTimeString(),
            };
            setMessages([...messages, newMessage]);
            setMessageInput('');
            setIsTyping(false);
        }
    };

    const handleTyping = (e) => {
        setMessageInput(e.target.value);
        setIsTyping(e.target.value.length > 0);
    };

    return (
        <div className="chat-container">
            <div className="dark-mode-switcher">
                <button onClick={() => document.body.classList.toggle('dark-mode')}>
                    Toggle Dark Mode
                </button>
            </div>

            <div className="chat-messages">
                {messages.map((message, index) => (
                    <div className={`message-bubble ${message.user === 'You' ? 'user-message' : ''}`} key={index}>
                        <div className="message-info">
                            <span className="message-user-name">{message.user}</span>
                            <span className="message-timestamp">{message.timestamp}</span>
                        </div>
                        <div className="message-content">{message.message}</div>
                    </div>
                ))}
            </div>

            {isTyping && <div className="typing-indicator">Someone is typing...</div>}

            <div className="message-input-form">
                <input
                    type="text"
                    className="message-input"
                    placeholder="Type a message"
                    value={messageInput}
                    onChange={handleTyping}
                />
                <button className="send-button" onClick={handleSendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatPage;












