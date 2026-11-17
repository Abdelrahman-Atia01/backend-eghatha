   import jwt from "jsonwebtoken"
import { userModel } from "../DB/models/user.model.js"
import ApiError from "../utils/ApiError.js"

export   const authMiddle=async(req,res,next)=>{  
    try{
     const {authorization}=req.headers
if(!authorization){
    return next(new ApiError("token is required",404))
}
const {id}=jwt.verify(authorization,process.env.token_user_key)
const user =await userModel.findById(id)
 
 req.user=user
 return next()
}
   catch(err){
        res.json({message:"error from auth MiddleWare",Error:err.message})

   }
}