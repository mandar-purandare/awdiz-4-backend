import { Router } from "express";
import { checkUserId } from "../Middlewares/AllMiddlewares.js";
import { addProduct, getAllProducts, getFilteredReuslts, getPageResults, getSingleProduct, getSortedResults, updateProduct, yourProducts, deleteProduct } from "../Controllers/Products.controllers.js";


const router = Router();

router.post("/add-product", checkUserId, addProduct);
router.get("/get-all-products", getAllProducts);
router.get("/get-single-product", getSingleProduct);
router.get("/get-page-results", getPageResults);
router.get("/get-sorted-results", getSortedResults);
router.get("/get-filtered-results", getFilteredReuslts);
router.post("/your-products", yourProducts);
router.post("/update-product", updateProduct);
router.delete("/delete-product", deleteProduct);

export default router;