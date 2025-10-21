import React, { useState, useEffect, useRef } from 'react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

const Chatbot = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // initial messages shown when chatbot opens
        if (isOpen && messages.length === 0) {
            setMessages([
                // newly added: centered text (from the top image)
                { id: 1, text: "Start asking what you think!", sender: 'bot', type: 'initial-center-text' },

                // text shown on the left side "Say hello to start"
                { id: 2, text: "Say hello to start", sender: 'bot', type: 'initial-prompt' },

                // button shown on the left side "Hello !"
                { id: 3, text: "Hello !", sender: 'bot', type: 'initial-button' }
            ]);
        }
    }, [isOpen]);

    // scrolls to bottom when messages update
    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleSendMessage = (text = inputValue) => {
        if (text.trim() === '') return;

        // remove initial message elements (initial-center-text, initial-prompt, initial-button)
        const filteredMsgs = messages.filter(msg =>
            msg.type !== 'initial-center-text' &&
            msg.type !== 'initial-prompt' &&
            msg.type !== 'initial-button'
        );

        const userMessage = {
            id: Date.now(),
            text,
            sender: 'user',
            time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })
        };

        setMessages([...filteredMsgs, userMessage]);
        setInputValue('');

        // chatbot reply (with a small delay)
        setTimeout(() => {
            let botReply = "I'm sorry, I don't understand that. Please try asking about 'Order', 'Refund', or 'Contact info'.";

            if (text.toLowerCase().includes('hello') || text.toLowerCase().includes('hi')) {
                botReply = "Hi there! Welcome to BabyZone Support. How can I assist you with your order, refund, or query today?";
            } else if (text.toLowerCase().includes('order')) {
                botReply = "To track or cancel your order, please visit the 'Track order & Cancel order' link on our Reach us page.";
            } else if (text.toLowerCase().includes('refund')) {
                botReply = "Refund details are available on our 'Exchange and refund policy' link, or you can check our FAQ section.";
            }

            setMessages((prevMessages) => [
                ...prevMessages,
                { id: Date.now() + 1, text: botReply, sender: 'bot', time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) }
            ]);
        }, 500);
    };

    return (
        <div className={`chatbot-modal ${isOpen ? 'open' : ''}`}>
            <div className="chatbot-header">
                <p>Messages are end-to-end encrypted</p>
                <button className="close-chat-button" onClick={onClose}>
                    <FaTimes />
                </button>
            </div>
            <div className="chatbot-messages">
                {messages.map((msg) => {
                    // 1. centered text
                    if (msg.type === 'initial-center-text') {
                        return (
                            <div key={msg.id} className="initial-center-text-bubble">
                                {msg.text}
                            </div>
                        );
                    }

                    // say hello to start (left side)
                    if (msg.type === 'initial-prompt') {
                        return (
                            <div key={msg.id} className="initial-prompt-bubble">
                                {msg.text}
                            </div>
                        );
                    }

                    // hello ! button (left side)
                    if (msg.type === 'initial-button') {
                        return (
                            <div key={msg.id} className="message-bubble bot initial-button-wrapper">
                                <button className="initial-hello-button" onClick={() => handleSendMessage('Hello !')}>Hello !</button>
                            </div>
                        );
                    }

                    // all other messages (user/bot replies)
                    return (
                        <div key={msg.id} className={`message-bubble ${msg.sender}`}>
                            {msg.text}
                            <span className="message-time">
                                {msg.time}
                                {msg.sender === 'user' && <FaPaperPlane className="sent-icon" />}
                            </span>
                        </div>
                    );
                })}
                <div ref={messagesEndRef} />
            </div>
            <div className="chatbot-input-area">
                <input
                    type="text"
                    placeholder="Type message..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage();
                    }}
                    className="chatbot-text-input"
                />
                <button className="send-message-button" onClick={() => handleSendMessage()}>
                    <FaPaperPlane />
                </button>
            </div>
        </div>
    );
};

export default Chatbot;
