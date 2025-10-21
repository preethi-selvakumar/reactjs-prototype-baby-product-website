import React from 'react';

import classImage1 from '../assets/images/child_development.png';
import classImage2 from '../assets/images/discipline.png';
import classImage3 from '../assets/images/parenting_techniques.png';
import classImage4 from '../assets/images/parenting_techniques_2.png';

const OnlineClasses = () => {

    const classData = [
        {
            title: "Child Development",
            starts: "28/08/2025",
            duration: "10 Days",
            image: classImage1
        },
        {
            title: "Discipline",
            starts: "29/08/2025",
            duration: "10 Days",
            image: classImage2
        },
        {
            title: "Parenting techniques",
            starts: "30/08/2025",
            duration: "10 Days",
            image: classImage3
        },
        {
            title: "Parenting techniques",
            starts: "02/09/2025",
            duration: "30 Days",
            image: classImage4
        }
    ];

    // For continuous animation (looping), we duplicate the data three times
    const repeatedClassData = [...classData, ...classData, ...classData];

    const ClassCard = ({ classItem, cardKey }) => (
        // Using key is necessary for React to identify elements efficiently
        <div className="online-class-card" key={cardKey}>
            <div className="online-class-card-img-wrapper">
                <img src={classItem.image} alt={classItem.title} className="online-class-card-image" />
            </div>
            <div className="online-class-card-content">
                <h3 className="online-class-title">{classItem.title}</h3>
                {/* START: This div is added to keep details in a single row */}
                <div className="online-class-details-row">
                    <p className="online-class-starts">Starts on {classItem.starts}</p>
                    <p className="online-class-duration">{classItem.duration}</p>
                </div>
                {/* END: This div is added to keep details in a single row */}
                <button className="online-class-join-btn">Join class</button>
            </div>
        </div>
    );

    return (
        <div className="online-classes-section container-fluid">
            <h2 className="online-classes-heading">Online Classes</h2>

            {/* Cards Container: This div controls the animation */}
            <div className="online-classes-cards-container">
                {/* Scrollable Wrapper: This div is the one that animates */}
                <div className="online-classes-cards-wrapper">
                    {repeatedClassData.map((classItem, index) => (
                        <ClassCard classItem={classItem} cardKey={index} key={index} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default OnlineClasses;
