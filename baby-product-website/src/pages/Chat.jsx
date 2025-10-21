import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ChatSidebar from '../components/ChatSidebar';
import GroupsList from '../components/GroupsList';
import ChatWindow from '../components/ChatWindow';

const Chat = () => {
    return (
        <div className="chat-page-wrapper d-flex flex-column" style={{ minHeight: '100vh' }}>

            <Navbar />

            {/* Main Content Wrapper: Sidebar and Groups List section */}
            <div className="container-fluid chat-content-area flex-grow-1">
                <div className="row g-0">

                    {/* ChatSidebar Component Container (25% on Desktop) */}
                    <div className="col-12 col-md-4 col-lg-3 col-xl-3 p-0 chat-sidebar-container">
                        <ChatSidebar />
                    </div>

                    {/* Groups List section (25% on Desktop) */}
                    <div className="col-12 col-md-8 col-lg-3 col-xl-3 p-0 chat-groups-list-container">
                        <GroupsList />
                    </div>

                    {/* Chat Window section */}
                    <div className="col-12 col-md-12 col-lg-5 col-xl-5 offset-lg-1 p-0 chat-window-container">
                        <ChatWindow />
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Chat;
