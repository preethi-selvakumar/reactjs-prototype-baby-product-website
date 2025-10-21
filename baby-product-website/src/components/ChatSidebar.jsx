import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IoHomeOutline, IoChatbubbleOutline, IoNotificationsOutline, IoLogOutOutline } from 'react-icons/io5';

import profileImage from '../assets/images/profile-moshin.png';

// Sidebar Link Component
const SidebarLink = ({ icon: Icon, text, onClickHandler, isLeave = false }) => {
    return (
        <div
            className={`d-flex align-items-center chat-sidebar-link-container ${isLeave ? 'chat-sidebar-leave-button' : ''}`}
            onClick={onClickHandler}
        >
            <Icon className="chat-sidebar-icon" />
            <span className="chat-sidebar-text ms-3">{text}</span>
        </div>
    );
};

const ChatSidebar = () => {
    const navigate = useNavigate();

    const handleLeave = () => {
        navigate('/forum');
    };

    const handleHome = () => {
        console.log('Home Clicked');
    };

    const handleChat = () => {
        console.log('Chat Clicked');
    };

    const handleNotification = () => {
        console.log('Notification Clicked');
    };

    return (
        <div className="chat-sidebar-wrapper d-flex flex-column p-4">

            {/* Profile Image Section */}
            <div className="chat-sidebar-profile-section text-center mb-5">
                <img
                    src={profileImage}
                    alt="Profile"
                    className="chat-sidebar-profile-image mb-3"
                />
            </div>

            {/* Navigation Links Section (Top) */}
            <div className="chat-sidebar-links-top flex-grow-1">
                <SidebarLink
                    icon={IoHomeOutline}
                    text="Home"
                    onClickHandler={handleHome}
                />
                <SidebarLink
                    icon={IoChatbubbleOutline}
                    text="Chat"
                    onClickHandler={handleChat}
                />
                <SidebarLink
                    icon={IoNotificationsOutline}
                    text="Notification"
                    onClickHandler={handleNotification}
                />
            </div>

            {/* Leave Button Section (Bottom) */}
            <div className="chat-sidebar-leave-section mt-auto">
                <SidebarLink
                    icon={IoLogOutOutline}
                    text="Leave"
                    onClickHandler={handleLeave}
                    isLeave={true}
                />
            </div>
        </div>
    );
};

export default ChatSidebar;