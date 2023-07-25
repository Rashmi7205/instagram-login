const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const jwtToken=require('jsonwebtoken')


const {Schema} = mongoose;

/// defining schema of the document
const userSchema = new Schema({
    name:{
        type:String,
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        required:[true,"email is required"]
    },
    password:{
        type:String,
        unique:true,
        required:true,
        select:false
    },
    username:{
        type:String,
        required:true
    }

}) ;

/// method for the token generation 
userSchema.methods={
    generateToken(){
        return jwtToken.sign({id:this.id,username:this.username},process.env.SECRET,{
            expiresIn:'24d'
        })
    }
}

/// for the password hashing

userSchema.pre('save',async function(next){
    if(!this.isModified('password'))
        return next();
    this.password = await bcrypt.hash(this.password,10);/// hashing the password
    return next();    
});


module.exports=mongoose.model('users',userSchema);

