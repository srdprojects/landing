import { ref } from 'vue';
function getRandomRating() {
    return Math.floor(Math.random() * 5) + 1;
}
function getRandomImage() {
    return Math.floor(Math.random() * images.value.length) ;
}

import BlackJeans from '../../src/assets/img/product-images/black-jeans.jpg';
import BlackNWhite from '../../src/assets/img/product-images/black-n-white-t-shirt.jpg';
import BlueTShirt from '../../src/assets/img/product-images/blue-t-shirt.jpg';
import ChessedShirt from '../../src/assets/img/product-images/chessed-shirt.jpg';
import GreenShirt from '../../src/assets/img/product-images/green-shirt.jpg';
import HalfedJeans from '../../src/assets/img/product-images/halfed-jeans.jpg';
import JeanTrousers from '../../src/assets/img/product-images/jeans-trousers.jpg';
import OrangeNBlack from '../../src/assets/img/product-images/orange-n-black-shirt.jpg';
import OrangeTShirt from '../../src/assets/img/product-images/orange-t-shirt.jpg';
import RedTShirt from '../../src/assets/img/product-images/red-t-shirt.jpg';
import WhiteTShirt from '../../src/assets/img/product-images/white-t-shirt.jpg';


const images = ref([
    BlackJeans,
    BlackNWhite,
    BlueTShirt,
    ChessedShirt,
    GreenShirt,
    HalfedJeans,
    JeanTrousers,
    OrangeNBlack,
    OrangeTShirt,
    RedTShirt,
    WhiteTShirt
]);

export const products = [
    {
        id: 1,
        title: "Product 1 Title",
        path: "./product1",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 2,
        title: "Product 2 Title",
        path: "./product2",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 3,
        title: "Product 3 Title",
        path: "./product3",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 4,
        title: "Product 4 Title",
        path: "./product4",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 5,
        title: "Product 5 Title",
        path: "./product5",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 6,
        title: "Product 6 Title",
        path: "./product6",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 7,
        title: "Product 7 Title",
        path: "./product7",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 8,
        title: "Product 8 Title",
        path: "./product8",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 9,
        title: "Product 9 Title",
        path: "./product9",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    {
        id: 10,
        title: "Product 10 Title",
        path: "./product10",
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    },
    ...Array.from({ length: 40 }, (_, i) => ({
        id: i + 11,
        title: `Product ${i + 11} Title`,
        path: `./product${i + 11}`,
        image: images.value[getRandomImage()],
        rating: getRandomRating()
    }))
];
export default products;

localStorage.setItem('products', JSON.stringify(products))