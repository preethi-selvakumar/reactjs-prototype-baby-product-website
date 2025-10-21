import rentalImage1 from '../assets/images/stroller2.png';
import rentalImage2 from '../assets/images/luvlap-stroller-blue.png';
import rentalImage3 from '../assets/images/babyhug-stroller-yellow.png';
import rentalImage4 from '../assets/images/chicco-car-seat.png';
import rentalImage5 from '../assets/images/joie-car-seat.png';
import rentalImage6 from '../assets/images/chinmay-carrier.png';
import rentalImage7 from '../assets/images/philips-monitor.png';
import rentalImage8 from '../assets/images/tp-link-camera.png';
import rentalImage9 from '../assets/images/lollipop-monitor.png';

const rentalProducts = [
    {
        id: 46,
        image: rentalImage1,
        name: 'LuvLap Galaxy Baby Stroller for 03 Years, 5-Point Safety Harness - Black',
        price: 2100,
        monthlyPrice: 2100,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#000000', '#dc3545', '#007bff'],
        isRental: true,
    },
    {
        id: 47,
        image: rentalImage2,
        name: 'Lightweight & Compact Tour Infant Travel Stroller with Compact Fold - Blue',
        price: 2750,
        monthlyPrice: 2750,
        age: '0-12m, 1-2y',
        colors: ['#007bff', '#28a745', '#dc3545'],
        isRental: true,
        isTrending: true,
    },
    {
        id: 48,
        image: rentalImage3,
        name: 'Babyhug Lil Giffee Baby Stroller - Yellow',
        price: 1750,
        monthlyPrice: 1750,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#ffc107', '#dc3545'],
        isRental: true,
    },
    {
        id: 49,
        image: rentalImage4,
        name: 'Chicco Unico Evo Car Seat -Black',
        price: 3100,
        monthlyPrice: 3100,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#000000', '#dc3545'],
        isRental: true,
        isFastMoving: true,
    },
    {
        id: 50,
        image: rentalImage5,
        name: 'Joie Car Seat Steadi R129 (Birth to 18 kg) Cobble Stone',
        price: 2499,
        monthlyPrice: 2499,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#6c757d', '#000000'],
        isRental: true,
        discountRate: 10,
    },
    {
        id: 51,
        image: rentalImage6,
        name: 'Chinmay Kids Baby Carrier Bag Adjustable Hands Free 4 in 1 Baby Safety Belt',
        price: 1950,
        monthlyPrice: 1950,
        age: '0-12m, 1-2y',
        colors: ['#000000', '#007bff'],
        isRental: true,
    },
    {
        id: 52,
        image: rentalImage7,
        name: 'Philips Corded Baby Monitoring Camera SCD641/00 | Live Two-Way Talk',
        price: 1300,
        monthlyPrice: 1300,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#000000', '#007bff', '#28a745'],
        isRental: true,
    },
    {
        id: 53,
        image: rentalImage8,
        name: 'TP Link 4MP 2K QHD 1440p Pan/Tilt Wifi SecurityCamera',
        price: 1650,
        monthlyPrice: 1650,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#ffffff', '#000000'],
        isRental: true,
        isPremium: true,
    },
    {
        id: 54,
        image: rentalImage9,
        name: 'Lollipop Smart Baby Monitor Camera - Pistachio',
        price: 1100,
        monthlyPrice: 1100,
        age: '0-12m, 1-2y, 2-3y',
        colors: ['#90ee90', '#dc3545', '#007bff'],
        isRental: true,
    },
];

export default rentalProducts;
