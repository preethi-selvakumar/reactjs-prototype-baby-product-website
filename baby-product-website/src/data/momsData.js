import momsImage1 from '../assets/images/moms-face-washers.png';
import momsImage2 from '../assets/images/moms-wipes.png';
import momsImage3 from '../assets/images/moms-shampoo.png';
import momsImage4 from '../assets/images/moms-baby-tub.png';
import momsImage5 from '../assets/images/moms-potty-training.png';
import momsImage6 from '../assets/images/moms-changing-mat.png';
import momsImage7 from '../assets/images/moms-wedge-pillow.jpg';
import momsImage8 from '../assets/images/moms-feeding-bottle-blue.jpg';
import momsImage9 from '../assets/images/moms-feeding-bottle-steel.jpg';

const products = [
    {
        id: 28,
        image: momsImage1,
        name: 'Abrocadabra Face Washers - D for Dino - Pack of 5 - Multicolor',
        price: 499,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Multicolor',
        colors: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
        isTrending: true,
    },
    {
        id: 29,
        image: momsImage2,
        name: '99% Pure Water Baby Wipes with Lid - Fragrance Free, Paraben Free & Ultra-Gentle',
        price: 129,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'White',
        colors: ['#ffffff', '#007bff'],
        isPremium: true,
    },
    {
        id: 30,
        image: momsImage3,
        name: 'Mothercare All We Know Baby Shampoo 300ml - Orange',
        price: 292,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Orange',
        colors: ['#fd7e14', '#ffffff'],
        isFastMoving: true,
    },
    {
        id: 31,
        image: momsImage4,
        name: 'Skip Hop Moby Smart Sling 3 Stage Tub - Blue',
        price: 4349,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Blue',
        colors: ['#007bff', '#ffffff'],
        discountRate: 5,
    },
    {
        id: 32,
        image: momsImage5,
        name: 'Mothercare Boys Potty Training Pants (Small) - Pack of 3 - Multicolor',
        price: 1299,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Multicolor',
        colors: ['#007bff', '#28a745', '#ffc107'],
        discountRate: 10,
    },
    {
        id: 33,
        image: momsImage6,
        name: 'Shooting Star Space and Rocket Diaper Changing Mat Waterproof - Multicolor',
        price: 299,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Multicolor',
        colors: ['#007bff', '#28a745', '#dc3545', '#ffc107'],
    },
    {
        id: 34,
        image: momsImage7,
        name: 'Tton Maternity Wedge Pillow with Quilted Cover - Dark Teal Soft yet Firm',
        price: 699,
        age: 'Maternity',
        colorName: 'Dark Teal',
        colors: ['#008080'],
        isPremium: true,
    },
    {
        id: 35,
        image: momsImage8,
        name: 'Chicco Natural Feeling Fast Flow Feeding Bottle Blue - 150 ml',
        price: 499,
        age: '0-12m, 1-3y',
        colorName: 'Blue',
        colors: ['#007bff', '#ffffff'],
    },
    {
        id: 36,
        image: momsImage9,
        name: 'Babyhug Sterilizable Steel Feeding Bottle - 410 ml',
        price: 620,
        age: '0-12m, 3-4y, 4-5',
        colorName: 'Silver',
        colors: ['#c0c0c0', '#000000'],
        discountRate: 20,
    },
];

export default products;
