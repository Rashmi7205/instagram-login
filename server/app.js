const express=require('express');
const cookieParser=require('cookie-parser');
const cors=require('cors');


const router=require('./routes/routes');
const connectToDb=require('./config/dbconfig');

const app=express(); 

/// connect to db
connectToDb();


app.use(cors({
    origin:"http://localhost:5500",
    credentials:true
}))
app.use(express.json());
app.use(cookieParser());
app.use('/user',router);

app.get('/',(req,res)=>{
    res.send('Hello, user');
})



module.exports=app; 