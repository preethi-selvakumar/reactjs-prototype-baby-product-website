import babyProducts from './babyFashionData';
import toysProducts from './toysData';
import footwearProducts from './footwearData';
import momsProducts from './momsData';
import furnitureProducts from './furnitureData';
import rentalProducts from './rentalData';
import mightLikeProducts from './mightLikeProductsData';

const mergedProducts = [
    ...babyProducts,
    ...toysProducts,
    ...footwearProducts,
    ...momsProducts,
    ...furnitureProducts,
    ...rentalProducts,
    ...mightLikeProducts,
];

export default mergedProducts;