import React from 'react';
import Navbar from '../components/Navbar';
import OnlineClasses from '../components/OnlineClasses';
import Workshops from '../components/Workshops';
import Footer from '../components/Footer';

const ParentingClass = () => {
    return (
        <div>
            <Navbar />
            <OnlineClasses />
            <Workshops />
            <Footer />
        </div>
    );
};

export default ParentingClass;