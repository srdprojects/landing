function getRandomRating() {
    return Math.floor(Math.random() * 5) + 1;
}

export const commentUsers = [
    {
        name: "Samantha D.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 14),
        text:
            "I absolutely love this t-shirt! The material is soft, lightweight, and breathable, making it super comfortable for all-day wear. The print quality is fantastic, and it has held up perfectly even after multiple washes. It fits true to size and looks stylish with any outfit. I’ve already received so many compliments! Highly recommended for anyone looking for a quality and trendy t-shirt.",
    },
    {
        name: "Alex M.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 15),
        text:
            "The t-shirt exceeded my expectations! The fabric is incredibly soft, and the stitching is well-done, ensuring durability. I love how it maintains its shape after washing, and the colors remain vibrant. The design is unique and makes a bold fashion statement without being too flashy. It’s comfortable enough for casual wear and stylish enough for an evening out. Absolutely worth the price!",
    },
    {
        name: "Olivia P.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 16),
        text:
            "As a UI/UX enthusiast, I value simplicity and functionality, and this t-shirt embodies both. The design is minimalist yet eye-catching, making it a great addition to my wardrobe. It’s not just about aesthetics—the comfort level is also top-notch. The fit is perfect, and the material feels premium. I appreciate how the design is modern and versatile, suitable for any occasion. Love it!",
    },
    {
        name: "Liam K.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 17),
        text:
            "This t-shirt is a fusion of comfort and creativity. The design is well thought out, offering a trendy yet relaxed vibe. The cotton fabric is breathable, making it ideal for warm weather, and the fit is just right—not too tight or too loose. It’s a fantastic choice whether you’re going out with friends or just lounging at home. I’d definitely buy more in different colors!",
    },
    {
        name: "Ava H.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 18),
        text:
            "I'm not just wearing a t-shirt; I'm wearing a piece of design philosophy. The print tells a story, and the quality ensures it lasts. It’s the kind of shirt that sparks conversations and makes a statement without trying too hard. The fit is flattering, and the soft material makes it incredibly comfortable to wear all day. Easily one of my favorite purchases this year!",
    },
    {
        name: "Ethan R.",
        stars: getRandomRating(),
        date: new Date(2023, 7, 19),
        text:
            "The intricate details and thoughtful layout of the design make this shirt a conversation starter. The print quality is exceptional—no cracking or fading even after multiple washes. It’s a perfect blend of fashion and comfort, ideal for everyday wear. The fabric is soft and durable, and the cut is stylish yet comfortable. I’d definitely recommend this to anyone who appreciates well-made apparel.",
    },
];


export default commentUsers