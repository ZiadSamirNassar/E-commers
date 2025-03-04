import express, { request, response } from "express";
import { getAllProducts } from "../services/productService";
import { auth, ExtendRequest } from "../middlewares/validateJWT";
import {authAdmin} from "../middlewares/admin";

const router = express.Router();

//Admin [create, update, delete]
    //create item
    router.post("/create", auth(), authAdmin(),  (request: ExtendRequest,response) => {
        response.send("Create item");
    });

    router.put("/update", auth(), authAdmin(), (request,response) => {
        response.send("Update item");
    });

    router.delete("/delete", auth(), authAdmin(), (request,response) => {
        response.send("delete item");
    });

//user [list] done
router.get("/", async (request, response) => {
    try{const products = await getAllProducts();

    response.status(200).send(products);}catch(err){
        response.status(500).send("Internal Server Error");
    }
});




export default router;