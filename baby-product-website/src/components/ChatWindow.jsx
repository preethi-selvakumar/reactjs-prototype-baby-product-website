import React, { useState } from 'react';
import { BsThreeDotsVertical } from 'react-icons/bs';
import { IoSend } from 'react-icons/io5';

import bennyProfile from '../assets/images/profile-moshin.png';
import user1Profile from '../assets/images/user1-profile.png';
import user2Profile from '../assets/images/user2-profile.png';
import user3Profile from '../assets/images/profile-deepa.jpg';
import currentUserProfile from '../assets/images/profile-deepa.jpg';

// Message Component
const Message = ({ text, time, profileImage, isUser }) => {
    return (
        <div className={`chat-window-message-row d-flex ${isUser ? 'justify-content-end' : 'justify-content-start'} mb-3`}>

            {/* Received Message - Profile Image (Left) */}
            {!isUser && (
                <div className="chat-window-message-profile-wrapper">
                    <img src={profileImage} alt="Profile" className="chat-window-message-profile-img" />
                </div>
            )}

            {/* Message Content */}
            <div className={`chat-window-message-bubble-content d-flex flex-column ${isUser ? 'chat-window-user-sent-bubble' : 'chat-window-user-received-bubble'}`}>
                <span className="chat-window-message-text">{text}</span>
                <span className="chat-window-message-time">{time}</span>
            </div>

            {/* Sent Message - Profile Image (Right) */}
            {isUser && (
                <div className="chat-window-message-profile-wrapper chat-window-user-sent-image-wrapper">
                    <img src={profileImage} alt="Profile" className="chat-window-message-profile-img" />
                </div>
            )}
        </div>
    );
};


// --- Initial Data (Remains the same) ---
const INITIAL_MESSAGES = [
    { id: 1, text: "Hi everyone !", time: "12:00 AM, 25/08/2025", profile: user1Profile, isUser: false },
    { id: 2, text: "Hi everyone !", time: "1:00 PM, 25/08/2025", profile: user2Profile, isUser: false },
    { id: 3, text: "Hi everyone !", time: "12:00 AM, 25/08/2025", profile: user3Profile, isUser: false },
    { id: 4, text: "Hi everyone !", time: "12:00 AM, 25/08/2025", profile: currentUserProfile, isUser: true },
];


// --- Main ChatWindow Component ---
const ChatWindow = () => {
    const [messages, setMessages] = useState(INITIAL_MESSAGES);
    const [inputText, setInputText] = useState('');

    // Sending logic (புதுப்பிக்கப்பட்டது)
    const handleSend = () => {
        const userText = inputText.trim();
        if (userText === '') return;

        // 1. User Message உருவாக்குதல்
        const now = new Date();
        const userMessage = {
            id: messages.length + 1,
            text: userText,
            time: `${now.getHours() % 12 || 12}:${now.getMinutes().toString().padStart(2, '0')} ${now.getHours() >= 12 ? 'PM' : 'AM'}, ${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`,
            profile: currentUserProfile,
            isUser: true,
        };

        // UI-இல் பயனர் செய்தியை உடனடியாகச் சேர்க்கவும்
        setMessages(prevMessages => [...prevMessages, userMessage]);
        setInputText('');

        // 2. Bot Reply Logic
        // பயனர் 'hi' அல்லது 'hi everyone' என்று அனுப்பினால் மட்டும் பதிலளிக்கவும் (Case-insensitive)
        if (userText.toLowerCase() === 'hi' || userText.toLowerCase() === 'hi everyone') {

            // பதிலளிக்கும் நேரத்தை உருவகப்படுத்த ஒரு சிறிய தாமதம் (e.g., 500ms)
            setTimeout(() => {
                const botTime = new Date();
                const botMessage = {
                    id: messages.length + 2, // அடுத்த id
                    text: "Hi everyone !", // Bot அனுப்பும் பதில்
                    // Bot-க்கான Profile Image-ஐ, INITIAL_MESSAGES-இல் உள்ளது போல, user1Profile-ஐப் பயன்படுத்துகிறேன்.
                    profile: user1Profile,
                    isUser: false, // இது ஒரு பெறப்பட்ட செய்தி
                    time: `${botTime.getHours() % 12 || 12}:${botTime.getMinutes().toString().padStart(2, '0')} ${botTime.getHours() >= 12 ? 'PM' : 'AM'}, ${botTime.getDate()}/${botTime.getMonth() + 1}/${botTime.getFullYear()}`,
                };

                // UI-இல் Bot செய்தியைச் சேர்க்கவும்
                setMessages(prevMessages => [...prevMessages, botMessage]);
            }, 500);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div className="chat-window-wrapper">
            {/* 1. Chat Header */}
            <div className="chat-window-header-container d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center">
                    <img src={bennyProfile} alt="Benny Profile" className="chat-window-header-profile-img" />
                    <div className="chat-window-header-info">
                        <div className="chat-window-header-name">Benny</div>
                        <div className="chat-window-header-status">Active</div>
                    </div>
                </div>
                <BsThreeDotsVertical className="chat-window-header-options-icon" />
            </div>

            {/* 2. Messages Area */}
            <div className="chat-window-messages-area">
                {messages.map(msg => (
                    <Message
                        key={msg.id}
                        text={msg.text}
                        time={msg.time}
                        profileImage={msg.profile}
                        isUser={msg.isUser}
                    />
                ))}
            </div>

            {/* 3. Message Input */}
            <div className="chat-window-input-area-container d-flex align-items-center">
                <input
                    type="text"
                    className="chat-window-message-input-box"
                    placeholder="Type Message"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className="chat-window-send-icon-wrapper" onClick={handleSend}>
                    <IoSend className="chat-window-send-icon" />
                </div>
            </div>
        </div>
    );
};

export default ChatWindow;