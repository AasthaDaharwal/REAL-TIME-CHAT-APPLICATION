import React, { useState } from 'react';
import './EmojiReaction.css';

function EmojiReaction({ messageId }) {
    const [reaction, setReaction] = useState('');

    const emojis = ['😊', '😂', '😢', '😡', '❤️']; // List of emojis

    const handleEmojiClick = (emoji) => {
        setReaction(emoji); // Set the emoji as the reaction for the message
    };

    return (
        <div className="emoji-reaction-container">
            <div className="emoji-list">
                {emojis.map((emoji, index) => (
                    <span 
                        key={index} 
                        className="emoji-icon" 
                        onClick={() => handleEmojiClick(emoji)}
                    >
                        {emoji}
                    </span>
                ))}
            </div>
            {reaction && <p>Reaction: {reaction}</p>} {/* Display the selected reaction */}
        </div>
    );
}

export default EmojiReaction;

