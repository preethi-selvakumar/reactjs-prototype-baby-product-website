import React from 'react';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import ReachUs from '../components/ReachUs';
import Faq from '../components/FAQ';

const Contact = () => {
    return (
        <div>
            <Navbar />
            <ReachUs />
            <Faq />
            <Footer />
        </div>
    );
};

export default Contact;