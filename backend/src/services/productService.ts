import { TypeFormatFlags } from "typescript";
import productModel from "../models/productModel"

export const getAllProducts = async () => {
    return await productModel.find();
};

//demo func
export const sendIntoProducts = async () => {
    try{const sampleProducts = [
        {
            title: "Dell labtop",
            description: "Lorem Ipsum is simply dummy text of the printing and",
            image: "https://static.toiimg.com/thumb/resizemode-4,width-1280,height-720,msid-111114820/111114820.jpg",
            price: 15000, stock: 50,
        },
        {
            title: "apple macbook",
            description: "Lorem Ipsum is simply dummy text of the printing and",
            image: "https://media.elbalad.news/2024/10/large/1009/9/902.jpg",
            price: 55000, stock: 10,
        },
    ];

    const products = await getAllProducts();
    if (products.length === 0) {
        await productModel.insertMany(sampleProducts);
        }
    } catch(err) { 
        return { data: "Internal Server Error", statuscode: 500 };
    }
};

interface createItem {
    titel: string;
    description: string;
    image: string;
    price: number;
    stock: number;
}
export const createItem =async ({titel, description, image, price, stock}: createItem) => {
  try{

    

  } catch(err) { 
    return { data: "Internal Server Error", statuscode: 500 };
}
};