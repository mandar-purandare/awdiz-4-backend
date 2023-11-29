import { Router } from "express";
import { addToCart, getCartProducts } from "../Controllers/User.controllers.js";

const router = Router();

router.post('/add-to-cart',addToCart);
router.get('/cart', getCartProducts);

export default router;