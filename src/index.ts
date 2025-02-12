import expess from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRiuts";

const app = expess();
const port = 3001;

app.use(expess.json());

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


app.use('/user', userRoute);

app.listen(port, () => {
    console.log(`Running on : http://localhost:${port}`);
});