const mongoose=require('mongoose');
require('dotenv').config();

const MONGODB_URL=process.env.MONGODB_URL;
const connectToDb = ()=>{

    mongoose.connect(MONGODB_URL)
    .then((connectionObj)=>{
        console.log('Db connected successfully',connectionObj.connection.host);
    })
    .catch(err=>{
        console.log(`Error in Db connection ${err.message}`);
    })

}

module.exports=connectToDb;