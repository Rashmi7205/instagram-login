exports.loginValidator = (req,res,next)=>{
    if(req.body && req.body.username && req.body.password){
        next();
    }
    else{
        return res.status(404).send({
            message:"Invalid Credentials"
        })
    }
}