import { Router } from "express";
import { addToCart, deleteCartProduct, getCartProducts } from "../Controllers/User.controllers.js";

const router = Router();

router.post('/add-to-cart',addToCart);
router.get('/cart', getCartProducts);
router.delete('/delete-from-cart', deleteCartProduct)

export default router;