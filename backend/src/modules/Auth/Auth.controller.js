import { userModel } from "../../DB/models/user.model.js";
import bcrypt from "bcrypt"
import CryptoJS from "crypto-js";
import jwt from 'jsonwebtoken'
import sendEmail, { subject } from "../../utils/sendingEmail.js";
import { sendEmail_templete } from "../../utils/sendEmail_templete.js";
import { acctivateSuccess } from "../../utils/activatesuccess.js";
import ApiError from "../../utils/apiError.js";
const register =async (req,res,next)=>{
   try{
    const { userName,email,password,confirmPassword,phone } =req.body
    if(password != confirmPassword){
    return next(new ApiError("confirmPassword doesnot match password",400))
    }
    
        const checkEmail = await userModel.findOne({email})
        if(checkEmail){
    return next(new ApiError("email is already exist",400))
        }
    //////hash password
        const passwordHash=await bcrypt.hash(password,parseInt(process.env.salt_rounds_password))
////////encryption phone
const cryptPhone=CryptoJS.AES.encrypt(phone,process.env.phone_private_key).toString()

        const user =await userModel.create({
    userName,
    email,
    password:passwordHash,
    phone:cryptPhone})

    ////email token
    const emailToken =jwt.sign({email},process.env.email_token)
    const verify_link=`http://localhost:3100/auth/activate_account/${emailToken}`
    // const result =await sendEmail({
    //     to:email,
    //     subject:subject.register,
    //     html:sendEmail_templete(verify_link)

    // })
    
const result = await sendEmail(
    email,
    subject.register,
    sendEmail_templete(verify_link)
);

 return res.json({message:" user add Donne",user})
    } catch (err) {
    res.status(500).json({
        message: "error from register",
        error: err.message
    });
}
    }

const login = async(req,res,next)=>{
    try{
const {email,password} =req.body
const user = await userModel.findOne({email})
if(!user){
    return next(new ApiError("please register before login",400))
}
const comparePasswrd=await bcrypt.compare(password,user.password)
if(!comparePasswrd){
    return next(new ApiError("password is not correct",400))
}
const token =jwt.sign({id:user._id},process.env.token_user_key,{expiresIn:60*60})
 res.json({message:"login success",Token:token,comparePasswrd})
    }catch(err){
    res.status(500).json({
        message: "error from login",
        error: err.message
    });
    }
}
const activate_account = async (req, res, next) => {
    try {
        const { emailToken } = req.params;
        const { email } = jwt.verify(emailToken, process.env.email_token);
        const user = await userModel.findOne({ email });
        if (!user) {
    return next(new ApiError("user not found",404))
        }
        user.confirmEmail = true;
        await user.save();
        // res.json({message:"you acctivated successfully"})
        return res.status(200).send(acctivateSuccess());
    } catch (error) {
         res.status(500).json({
        message: "error from activate_account",
        error: err.message
    });
    }
}
export{
    register,
    login,
    activate_account
}