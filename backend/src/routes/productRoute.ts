import express, { request, response } from "express";
import { getAllProducts, createItem } from "../services/productService";
import { auth, ExtendRequest } from "../middlewares/validateJWT";
import {authAdmin} from "../middlewares/admin";
import {uplodeimg} from "../middlewares/uplodeImage";


const router = express.Router();

//Admin [create, update, delete]
    //create item
    router.post("/create",
        auth(),
        authAdmin(),
        uplodeimg.single('image'),//midelware to uplode Files("image")
        async (request: ExtendRequest,response) => {
        try{
            const {title, description} = request.body;
            const price = +request.body.price;
            const stock = parseInt( request.body.stock);
            const file = String(request.file?.path);

            if(!request.file){
                response.status(404).send("Item Image is Required");
             }

            const {data, statusCode} = await createItem({title, description, file, price, stock});

            response.status(statusCode).send(data);
            
        }catch(err){
            response.status(500).send("Internal Server Error: '/item/create'");
        }
    });

    router.put("/update", auth(), authAdmin(), (request,response) => {
        response.send("Update item");
    });

    router.delete("/delete", auth(), authAdmin(), (request,response) => {
        response.send("delete item");
    });

//user [list] done
router.get("/", async (request, response) => {
    try{
        const products = await getAllProducts();

        response.status(200).send(products);
    }catch(err){
        response.status(500).send("Internal Server Error");
    }
});




export default router;