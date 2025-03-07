import("dotenv/config");

import expess from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRiuts";
import productRouter from "./routes/productRoute";
import cardRouter from "./routes/cardRoute"
import { sendIntoProducts } from "./services/productService";

const app = expess();
const port = 3001;

app.use(expess.json());
app.use(expess.urlencoded({ extended: true }));
app.use(expess.static("uploads"));

app.use((req, res, next) => {
    console.log(`Request URL: http://localhost:3001${req.url}`);
    next();
});

mongoose
    .connect("mongodb://localhost:27017/ecommerce")
    .then(() => console.log("DataBase Connected"))
    .catch((err) =>
        console.log("Faild on Connecting to DataBase =================> ", err)
);


//sed the products into database
sendIntoProducts();

app.use('/card', cardRouter)
app.use('/products', productRouter);
app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Running on : http://localhost:${port}`);
});