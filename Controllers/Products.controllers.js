import ProductModel from "../Models/Product.model.js";

export const getAllProducts = (req, res) => {
    res.send("All Products...");
}

export const getSingleProduct = (req, res) => {
    res.send("Single Product...");
}

export const addProduct = async (req,res) => {
   try{
            const {name, price, category, image, id} = req.body;

            if(!name || !price || !category || !image || !id) return res.status(401).json({success: false, message:"All fields are mandatory"});
        
            const product = new ProductModel({
                name,
                price,
                category,
                image,
                id
            })
        
            await product.save();
        
            return res.status(201).json({success:true, message:"Added New Product"});

   } catch(error){
        return res.status(500).json({success:false, message: error.message});
   }

}