import ProductModel from "../Models/Product.model.js";

export const getAllProducts = async (req, res) => {
    try{
        const products = await ProductModel.find({});
        if(products.length === 0) return res.status(401).json({success:false, message:"No Products found"});

        return res.status(200).json({success:true, products:products});
    } catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export const getSingleProduct = async (req, res) => {
    try{
        const {id} = req.body;
        if(!id) return res.status(401).json({success:false, message:"No product ID provided"});

        const product = await ProductModel.findById({_id:id});
        if(!product) return res.status(401).json({success:false, message:"Product not found"});

        return res.status(200).json({success:true, product:product});
    } catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
    
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
        console.log(error.message);
        return res.status(500).json({success:false, message: error.message});
   }

}