const express=require('express');
const cookieParser=require('cookie-parser');

const {signUp,logIn,getUser}=require('../controllers/controller');

///getting the middleares
const {authenticateUser}=require('../middlewares/authenticateuser');
const {loginValidator} = require('../middlewares/loginvalidation');
const {signUpValidator} = require('../middlewares/signupValidation')

const Router=express.Router();

Router.post('/signup',signUpValidator,signUp);
Router.post('/login',loginValidator,logIn);
Router.get('/getuser',authenticateUser,getUser);

module.exports=Router;