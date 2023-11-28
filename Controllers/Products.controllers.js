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
        const {id} = req.query;
        if(!id) return res.status(401).json({success:false, message:"No product ID provided"});
        console.log(id);

        const product = await ProductModel.findById(id);
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

export const getPageResults = async (req, res) => {
    try{
        const {page} = req.body;
        if(!page) return res.status(401).json({success:false, message:"Page number required"});

        const products = await ProductModel.find({}).skip(page*2).limit(2);
        if(!products) return res.status(401).json({success:false, message:"No products found"});

        return res.status(200).json({success:true, products:products})

    } catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export const getSortedResults = async (req,res) => {
    try{
        const {sortType} = req.body;
        if(!sortType) return res.status(401).json({success:false, message:"Sort type required"});

        const products = await ProductModel.find({}).sort({price:sortType});
        if(products.length === 0) return res.status(401).json({success:false, message:"No products found"})

        return res.status(200).json({success:true, products:products});
    } catch(error){
        return res.status(500).json({success:false, message:error.message}); 
    }
}

export const getFilteredReuslts = async (req,res) => {
    try{
        const {filterValue} = req.body;
        if(!filterValue) return res.status(401).json({success:false, message:"Filter value is required"});

        const products = await ProductModel.find({category:filterValue});
        if(!products) return res.status(401).json({success:false, message:"No products found"});

        return res.status(200).json({success:true, products:products})

    }catch(error){
        return res.status(500).json({success:false, message:error.message}); 
    }
}

export const yourProducts = async (req,res) => {
    try{
        const {id} = req.body;
        
        if(!id) return res.status(401).json({success:false, message:"No user ID provided"});

        const products = await ProductModel.find({id:id});
        if(!products) return res.status(401).json({success:false, message:"Products not found"});

        return res.status(200).json({success:true, products:products});

    }catch(error){
        return res.status(500).json({success:false, message:error.message}); 
    }
}

export const updateProduct = async (req,res) => {
    try{
        const {id, product} = req.body;
        if(!id || !product) return res.status(401).json({success:false, message:"Product Id or Details not provided"});
    
        const updatedProduct = await ProductModel.findByIdAndUpdate(id,{...product});
        if(!updatedProduct) return res.status(401).json({success:false, message:"Product could not be updated"})

        return res.status(200).json({success:true, message:"Product updated successfully"});
    }catch(error){
        return res.status(500).json({success:false, message:error.message}); 
    }
    
}