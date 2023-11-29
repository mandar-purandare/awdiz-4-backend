import UserModel from "../Models/User.model.js";
import ProductModel from "../Models/Product.model.js";
import { getSingleProduct } from "./Products.controllers.js";
import express from "express";

const app = express();

export const addToCart = async (req,res) => {
    try{
        const {userId, productId} = req.body;
        if(!productId || !userId) return res.status(401).json({success:false, message:"User and Product are mandatory"})
        await UserModel.findByIdAndUpdate({ _id: userId },{ $push: { cart: productId } })
        return res.status(200).json({success:true, message:"Product added to cart successfully"})
    }catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}

export const getCartProducts = async (req,res) => {
    try{
        const {id} = req.query;
        if(!id) return res.status(401).json({success:false, message:"No user ID provided"});
        console.log(id);

        const user = await UserModel.findById(id);
        if(!user) return res.status(401).json({success:false, message:"User not found"});

        if(user.cart.length > 0){

            let cartProducts = [];
            for(let i=0; i<user.cart.length; i++){
                // console.log('product');
                try{
                    let product = await ProductModel.findById(user.cart[i]);
                    cartProducts.push(product);
                    // console.log('product', product);
                }catch(error){
                    return res.status(500).json({success:false, message:error.message});
                }
                
            }
            return res.status(200).json({success:true, products:cartProducts});


        }

    } catch(error){
        return res.status(500).json({success:false, message:error.message})
    }
}
