const restrictTo=(...roles)=>{
    return(req,res,next)=>{
        if(!roles.includes(req.user.role)){
            res.status(401).json({message:'This operations is restricted. only Admin or Operator can access it'});
        }
        next();
    }
}

export default restrictTo;