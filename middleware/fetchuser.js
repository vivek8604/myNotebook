const jwt =require('jsonwebtoken')
const JWT_SECRET='iamgoo$boy'
const fetchuser=(req,res,next)=>{
    try {
        // Get the user from the jwt token and add id to req object
        const token=req.header('auth-token')
        if(!token){
            res.status(401).send({err:"please authenticate using a valid email"})
        }
        const data =jwt.verify(token,JWT_SECRET)
        req.user=data.user
    next()
    }  catch (error) {
        res.status(401).send({ error: "Please authenticate using a valid token" })
    }
}
module.exports=fetchuser