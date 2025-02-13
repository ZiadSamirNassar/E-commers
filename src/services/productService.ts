import productModel from "../models/productModel"

export const getAllProducts = async () => {
    return await productModel.find();
};

export const sendIntoProducts = async () => {
    const sampleProducts = [
        {
            title: "Dell labtop",
            image: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-111114820/111114820.jpg",
            price: 15000, stock: 50,
        },
        {
            title: "apple macbook",
            image: "https://media.elbalad.news/2024/10/large/1009/9/902.jpg",
            price: 55000, stock: 10,
        },
    ];

    const products = await getAllProducts();
    if (products.length === 0) {
        await productModel.insertMany(sampleProducts);
    }
};