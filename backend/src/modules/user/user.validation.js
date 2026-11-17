import Joi from "joi";
export const udateProfileSchema=Joi.object({
    email:Joi.string().email().required(),
    userName:Joi.string().required(),
    _id:Joi.string()
}).required()
export const changePasswordSchema=Joi.object({
email:Joi.string().email().required(),
currentPassword:Joi.string().required(),
newPassword:Joi.string().not(Joi.ref("currentPassword")).required(),
confirmPassword:Joi.string().valid(Joi.ref("newPassword")).required()
}).required()