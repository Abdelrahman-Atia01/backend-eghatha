
 const validation=(schema)=>{
    return (req,res,next)=>{
        const data = {...req.body,...req.params,...req.query}
        const result=schema.validate(data,{abortEarly:false})
        if(result.error){
                    const errorMessage=result.error.details.map((obj)=>obj.message)
            return res.json({message:"error from validation",error:errorMessage})
        }
        return next()
    }
}
export default validation;