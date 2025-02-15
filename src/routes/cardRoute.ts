import express from "express";
import { addItemsToCard, getActiveCardFourUser } from "../services/cardService";
import { auth, ExtendRequest } from "../middlewares/validateJWT";
import { Request } from "express";
const router = express.Router();

router.get("/",
    auth(),
    async (req: ExtendRequest, res) => {
        const user = req.user;
        console.log(user);

        try {
            const userId = req.user._id; // Correctly extract userId from req.user
            const card = await getActiveCardFourUser({ userId });
            res.status(200).send(card);
        } catch (err) {
            res.status(500).send("Internal Server Error");
        }
    }
);

router.post("/items", auth(), async (req: ExtendRequest, res) => {
    const userId = req?.user?._id;
    const { productId, quantity } = req.body;
    const { data, statuscode } = await addItemsToCard({ userId, productId, quantity });
    res.status(statuscode).send(data);
})

export default router;