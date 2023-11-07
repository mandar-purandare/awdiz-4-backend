import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, getAllProducts, getSingleProduct } from "../Controllers/Products.controllers.js";


const router = Router();

router.post("/add-product", checkUserId, addProduct);
router.get("/get-all-products", getAllProducts);
router.post("/get-single-product", getSingleProduct);


export default router;