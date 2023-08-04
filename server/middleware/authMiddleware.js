const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler") ;

module.exports =  asyncHandler(async (req,res,next)=>{
    // console.log(req)
    // console.log(req.cookies) ;
    const token = req.cookies?.token ;
    if(token)
    {
        try{

            data = jwt.verify(token,process.env.JWT_SECRET)
            // console.log(data._id)
            req.user = data;
            next() ;
        }catch(err)
        {
            res.status(401).json({"ERROR" : {
                message : "wrong credential"
            }})
            console.log(err) ;
        }
       
    }
    else
    {
        res.status(404).json({"ERROR" : {
            "message" : "token missing"
        }})
    }
})
