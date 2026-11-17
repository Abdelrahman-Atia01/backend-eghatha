import nodemailer from "nodemailer"
const sendEmail=async(to,subject,html)=>{
    ///configration sending
const transporter=nodemailer.createTransport({
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth:{
        user:"atia61035@gmail.com",
        pass:"rbrz zycz pjtv vqgt"
    }
})
    ///configration reciever

const info =await transporter.sendMail({
from:"atia61035@gmail.com",
to,
subject,
html,
})
// console.log(info)
return info.rejected.length===0?true:false
}
export const subject ={
    register:"registered email",
    reset:"reseted email"
}
export default sendEmail
// sendEmail()