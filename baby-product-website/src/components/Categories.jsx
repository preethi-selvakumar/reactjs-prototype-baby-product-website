import React from 'react';
import { Link } from 'react-router-dom';

// === 💡 IMAGE IMPORTS: Change these paths to your actual image locations 💡 ===
import boysFashionImg from '../assets/images/boys-fashion.jpg';
import girlsFashionImg from '../assets/images/girls-fashion.jpg';
import footwearImg from '../assets/images/sandal.png';
import accessoriesImg from '../assets/images/accessories.jpg';
import toysImg from '../assets/images/toys.jpg';
import bedsImg from '../assets/images/beds.jpg';

const Categories = () => {
    const categoriesData = [
        { name: 'Boys fashion', image: boysFashionImg, path: '/baby-fashion-link' },
        { name: 'Girls fashion', image: girlsFashionImg, path: '/baby-fashion-link' },
        { name: 'Footwear', image: footwearImg, path: '/footwear-accessories-link' },
        { name: 'Accessories', image: accessoriesImg, path: '/footwear-accessories-link' },
        { name: 'Toys', image: toysImg, path: '/toys-link' },
        { name: 'Beds', image: bedsImg, path: '/furniture-bedding' },
    ];

    return (
        <div className="categories-wrapper">
            <div className="container-fluid custom-container-padding">
                <h2 className="categories-title">Categories</h2>
                <div className="row categories-row justify-content-center">
                    {categoriesData.map((category, index) => (
                        <div className="col-6 col-sm-4 col-md-3 col-lg-2 mb-4 category-col" key={index}>
                            <Link to={category.path} className="category-link">
                                <div className="category-circle">
                                    <img src={category.image} alt={category.name} className="category-image" />
                                </div>
                                <p className="category-name-text">{category.name}</p>
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="category-divider-line"></div>
            </div>
        </div>
    );
};

export default Categories;