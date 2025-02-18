import express from "express"
import { login, register } from "../services/userService";

const router = express.Router();


router.post('/register', async (request, response) => {
    try {//get user data from request body
        const { firstName, lastName, email, password } = request.body;

        //pase user data for register function and wait for it
        //then get register function response as: data massage and status code
        const { data, statuscode } = await register({ firstName, lastName, email, password });

        //send my respons
        response.status(statuscode).send(data);
    } catch (err) { response.status(500).send("Internal Server Error") }
})

router.post('/login', async (request, respons) => {
    try {//get user data from request body
        const { email, password } = request.body;

        //pase user data for login function and wait for it
        //then get login function response as: data massage and status code
        const { data, statuscode } = await login({ email, password });

        //send my respons
        respons.status(statuscode).send(data);
    }
    catch (err) { respons.status(500).send("Internal Server Error") }
})

export default router;