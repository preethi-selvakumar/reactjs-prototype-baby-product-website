import React from 'react';

import pregnancyImage from '../assets/images/pregnancy.png';
import parentingImage from '../assets/images/parenting.png';
import childcareImage from '../assets/images/childcare.png';
import productReviewsImage from '../assets/images/product-reviews.png';

const GROUPS_DATA = [
    { title: "Pregnancy", users: "500 Users", image: pregnancyImage, active: false },
    { title: "Parenting", users: "500 Users", image: parentingImage, active: true },
    { title: "Child care", users: "500 Users", image: childcareImage, active: false },
    { title: "Product reviews", users: "500 Users", image: productReviewsImage, active: false },
];

// Group Item Component
const GroupItem = ({ title, users, image, active }) => {
    return (
        <div className={`d-flex align-items-center mb-3 groups-item-container ${active ? 'groups-item-active' : ''}`}>

            {/* Icon / Image */}
            <div className="groups-icon-wrapper">
                <img src={image} alt={title} className="groups-item-image" />
            </div>

            {/* Text Content (Title & Users) */}
            <div className="groups-text-content d-flex justify-content-between align-items-center flex-grow-1">
                <span className="groups-item-title">{title}</span>
                <span className="groups-item-users">{users}</span>
            </div>
        </div>
    );
};

// Main GroupsList Component
const GroupsList = () => {
    return (
        <div className="groups-list-wrapper">
            <h2 className="groups-list-heading mb-4">Groups</h2>

            <div className="groups-list-items">
                {GROUPS_DATA.map((group, index) => (
                    <GroupItem
                        key={index}
                        title={group.title}
                        users={group.users}
                        image={group.image}
                        active={group.active}
                    />
                ))}
            </div>
        </div>
    );
};

export default GroupsList;