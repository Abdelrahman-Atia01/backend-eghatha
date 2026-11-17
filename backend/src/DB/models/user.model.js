import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    userName:{
        required:[true,"userName is required"],
        type:String,
        minLength:[3,"userName at least 3 character"],
        maxLength:[100,"userName at most 100 character"],
        trim:true,
        lowerCase:true
    },
email:{
    required:true,
    type:String,
    trim:true,
    unique:true,
    match:[/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,"email must be contain @"]
},
confirmEmail:{
    type:Boolean,
    default:false
},
password:{
    unique:[true,"password must be unique"],
    trim:true,
    type:String
},
gender:{
    type:String,
    enum:{
        values:["male","female","not specified"],
        default:"not specified",
        message: "password must be male or female"
    }
},
role:{
type:String,
enum:{
    values:["user","admin"],
default:"user",
 message: "role must be user or admin"
}
},
BOD:String,
adress:String,
phone:String,
image:String

},{timestamps:true})


export const userModel = mongoose.model('User',userSchema)