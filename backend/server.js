import express from 'express'
import { configDotenv } from "dotenv";
import DB_Connection from './src/DB/connection.js';
import AuthRouter from "./src/modules/Auth/Auth.router.js"
import userRouter from "./src/modules/user/user.router.js"
import ApiError from './src/utils/apiError.js';
const app =express()
configDotenv()
DB_Connection()
app.use(express.json())
app.use("/auth",AuthRouter)
app.use("/user",userRouter)

 app.use((req, res, next) => {
   
next(new ApiError(`can't find this route:${req.originalUrl}`,404))
});


app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        statusCode:err.statusCode,
        status: err.status,
        message: err.message
    });
});
app.listen(process.env.PORT,()=>{
    console.log("app is running")
})
