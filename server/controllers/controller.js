const User=require('../model/schema');
const JWT=require('jsonwebtoken');
const mongoose=require('mongoose');
const bcrypt=require('bcrypt')

const home = (req,res)=>{
    return res.send("true");
}

const signUp = async(req,res)=>{
    const {name,email,password,username}=req.body;

    if(!name||!email||!password||!username){
        res.status(400).json({
            success:true,
            message:'Incorrect info'
        })
    }

    try{
        const result = await User.create(req.body);
        return res.status(200).json({
            success:true,
            message:'Signup successfull'
        })
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:'invalid inputs'

        })
    }
}

const logIn = async(req,res)=>{

    const {username,password} = req.body;
    if(!username||!password){
        return res.status(400).json({
            success:false,
            message:'invalid inputs'

        }) 
    }

    try{
    const getUserInfo= await User.findOne({username}).select('+password');

    const result = await bcrypt.compare(password,getUserInfo.password);

    if(result){
        const token=getUserInfo.generateToken();

        const cookieOption = {
            maxAge:24*60*60*1000,///24 hr
            httpOnly:true /// Cannot be accsessed by the client side javascript
        }

        res.cookie("token",token,cookieOption);
        return res.status(200).json({
            success:true,
            message:'Logged in successfully',
            data:getUserInfo
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:"Password incorrect"
        })
    }
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:err.message
        })
    }
}


const getUser = async (req,res)=>{
    const {id,username} = req.user;
    try {
        const user = await User.find({username});

        return res.status(200).json({
            success:true,
            data:user
        });

    } catch (error) {
        return res.status(400).json({
            success:false,
            message:error.message
        });
    }
}

module.exports={
    home,
    signUp,
    logIn,
    getUser
}