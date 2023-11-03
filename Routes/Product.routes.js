import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct } from "../Controllers/Products.controllers.js";


const router = Router();

router.post("/add-product", checkUserId, addProduct)

export default router;