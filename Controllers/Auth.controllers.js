import UserModel from '../Models/User.model.js'
import bcrypt from 'bcrypt'
import Jwt from 'jsonwebtoken';

export const Login = async (req,res) => {
    try{
        const {email, password} = req.body;

        if(!email || !password) return res.status(401).json({success:false, message:"All fields are mandatory"});

        const user = await UserModel.findOne({email:email});
        
        if(!user) return res.status(401).json({success:false, message:"Email is wrong"});

        const isCorrectPassword = await bcrypt.compare(password, user.password);
        // return res.json({iscorrectpassowrd:isCorrectPassword});

        if(!isCorrectPassword) return res.status(401).json({success:false, message:"Password is wrong"});

        const token = await Jwt.sign({id: user._id}, process.env.JWT_SECRET);

        return res.status(200).json({success:true, message:"Login successful", user: {name: user.name, password: user.password}, token});

    } catch(error){
        return res.status(500).json({success:false, message: error})
    }
}

export const Register = async (req,res) => {
    try{
        
        const {name,email,password,number} = req.body;
        if(!name || !email || !password || !number) return res.status(401).json({success: false, message: "All fields are mandatory."})

        const hashedPassword = await bcrypt.hash(password,10);
        // console.log(hashedPassword,"hashedpassword");
        const user = new UserModel({
            name: name,
            email,
            password:hashedPassword,
            number
        })

        await user.save();

        return res.status(200).json({success: true, message: "Registration Successfull."})
    } catch(error){
        return res.status(500).json({success: false, message: error})
    }
}

export const getCurrentUser = async (req,res) => {
    try{
         const {token} = req.body;
         if(!token) return res.status(401).json({success:false, message:"token is required"});

         const {id} = Jwt.verify(token, process.env.JWT_SECRET);
         console.log(id, 'id');
         const user = await UserModel.findById(id);
         if(!user) return res.status(401).json({success: false, message:"User not found"});

         return res.status(200).json({success:true, user:{ name: user.name, id: user._id}})

    } catch(error){
        return res.status(500).json({success:false, message:error})
    }
}