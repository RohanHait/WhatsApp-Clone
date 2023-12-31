const notFound = (req,res,next)=>{
    const error = new Error(`Not Found - ${req.orginalUrl}`) ;
    res.status(404)
    next(error) ;
}

const errorHandel = (err,req,res,next) =>{
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode ;
    res.status(statusCode) ;
    res.json({"ERROR" : {
        message : err?.message,
    }})
}
module.exports = {notFound, errorHandel}