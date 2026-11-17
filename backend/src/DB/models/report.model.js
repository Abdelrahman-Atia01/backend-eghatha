import mongoose, { Schema, Types } from "mongoose";
const reportSchema=new Schema({
    content:{
        type:String,
        required:[true,"report is required"]
    },
sender:{
    type:Types.ObjectId,
    ref:"User",
    required:true

}
},{timestamps:true})
export const reportModel=mongoose.model('Report',reportSchema)