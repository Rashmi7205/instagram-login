exports.signUpValidator = (req,res,next)=>{
    if(req.body){
        const{name,email,password,username} = req.body;
        if(name && email && password && username){
            next();
        }
        else{
            return res.status(404).send({
                message:"Invalid user details"
            })
        }
    }
    else{
        return res.status(404).send({
            message:"Invalid user details"
        })
    }   
}