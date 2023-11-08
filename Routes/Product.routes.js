import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, getAllProducts, getFilteredReuslts, getPageResults, getSingleProduct, getSortedResults } from "../Controllers/Products.controllers.js";


const router = Router();

router.post("/add-product", checkUserId, addProduct);
router.get("/get-all-products", getAllProducts);
router.post("/get-single-product", getSingleProduct);
router.get("/get-page-results", getPageResults);
router.get("/get-sorted-results", getSortedResults);
router.get("/get-filtered-results", getFilteredReuslts);


export default router;