import { userModel } from "../../DB/models/user.model.js";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken"
import ApiError from "../../utils/ApiError.js";
import bcrypt from "bcrypt"

const getUser=async(req,res,next)=>{
try{
const {user}=req
    user.phone=CryptoJS.AES.decrypt(user.phone,process.env.phone_private_key).toString(CryptoJS.enc.Utf8)//to convert format from iso to string
 return   res.json({message:" get user Donne",user})

}catch(err){
 return   res.json({message:"error from user controller",Error:err.message})
}
}
const updateProfile = async(req,res,next)=>{

try{
   const {_id} =req.body 
    const user =await userModel.findById({_id})
    if(!user){return next(new ApiError( "user is not found",404))}
    const updatedUser= await userModel.findByIdAndUpdate(
        {_id:user._id},
        {...req.body},
      {
    returnDocument: 'after',//  >>>>  =   {new:true}

    runValidators: true
  })
  return  res.json({message:"user updated successfully",updatedUser})

}catch(err){
return next(new ApiError(err,400))
}
}
const changePassword =async(req,res,next)=>{
try{
const{email,currentPassword,newPassword}=req.body
  const user = await userModel.findOne({email})
  if(!user){
    return next(new ApiError("please enter valid email"))
  }
  const comparePassword=await bcrypt.compare(currentPassword,user.password)
  if(!comparePassword){
      return next(new ApiError("password is not correct",400))
  }
  const hashPassword= bcrypt.hashSync(newPassword,parseInt(process.env.salt_rounds_password))
user.password=hashPassword
await user.save()
return res.json({message:"user password changed successfully"})
}catch(err){
return next(new ApiError(err,400))
}
}
const uploadImage = (req,res,next)=>{
return res.json({message:"file uploaded successfully"})
}
export{
    getUser,
    updateProfile,
    changePassword,
    uploadImage
}