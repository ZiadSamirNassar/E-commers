import express from "express";
import { checkout, clearCard, deleteItemsFromCard, addItemsToCard, getActiveCardFourUser, updateItemsInCard } from "../services/cardService";
import { auth, ExtendRequest } from "../middlewares/validateJWT";
import { Request } from "express";
const router = express.Router();

router.get("/",
    auth(),
    async (req: ExtendRequest, res) => {
        try {
            const userId = req.user._id; // Correctly extract userId from req.user
            const card = await getActiveCardFourUser({ userId });
            res.status(200).send(card);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
);

router.delete("/", auth(), async (req: ExtendRequest, res) => {
    try{const userId = req.user.id;
    const { data, statuscode } = await clearCard({ userId });
        res.status(statuscode).send(data);
    } catch (err) {
        res.status(500).send("Internal Server Error");
    }
});

router.post("/items", auth(), async (req: ExtendRequest, res) => {
    try{const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const { data, statuscode } = await addItemsToCard({ userId, productId, quantity });
    res.status(statuscode).send(data);}catch(err){
        res.status(500).send("Internal Server Error");
    }
});


router.put("/items", auth(), async (req: ExtendRequest, res) => {
    try{const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const { data, statuscode } = await updateItemsInCard({ userId, productId, quantity });
    res.status(statuscode).send(data);}catch(err){
        res.status(500).send("Internal Server Error");
    }
});


router.delete("/items/:productId", auth(), async (req: ExtendRequest, res) => {
    try{const userId = req?.user?._id;
    const { productId } = req.params;
    const { data, statuscode } = await deleteItemsFromCard({ userId, productId });
    res.status(statuscode).send(data);}catch(err){
        res.status(500).send("Internal Server Error");
    }
});

router.post("/checkout", auth(), async (req: ExtendRequest, res) => {
    try{const userId = req?.user?._id;
    const { address } = req.body;
    const { data, statuscode } = await checkout({ userId, address });
    res.status(statuscode).send(data);}catch(err){
        res.status(500).send("Internal Server Error");
    }
});

export default router;