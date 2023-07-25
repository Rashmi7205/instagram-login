const JWT=require('jsonwebtoken');
exports.authenticateUser=(req,res,next)=>{
    /// if token present the get the token from cookie else set it to null
    const token = req.cookies?.token||null;
    if(!token){
       return res.status(400).send({
            success:false,
            message:"user authentication failed"
        });
    }

    try {
        /// verify if logged in or not
        const payload = JWT.verify(token,process.env.SECRET);
       
        req.user={id:payload.id,username:payload.username};
        next();
    } catch (error) {
        return res.status(400).send({
            success:false,
            message:error.message
        });
    }


}