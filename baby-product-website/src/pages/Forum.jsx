import React from 'react';
import Navbar from '../components/Navbar';
import JoinForum from '../components/JoinForum';
import Blogs from '../components/Blogs';
import Footer from '../components/Footer';

const Forum = () => {
    return (
        <div>
            <Navbar />
            <JoinForum />
            <Blogs />
            <Footer />
        </div>
    );
};

export default Forum;