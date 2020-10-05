const validRole=async(req,res,next)=>{
    const validRole=joi.object({
      role:joi.string().required().valid('user','driver','operator','admin').trim(),
    });
    const request=validRole.validate(req.body);
    if(request.error){
      let message, error=request.error.details[0].message;
     if(error=="\"role\" is required"){
       message=res.__('Please enter role')
     }
     else if (error=="\"role\" must be one of [user, driver, operator, admin]"){
      message=res.__('Invalid role,role must be user,driver,operator or admin')
     }
      return res.status(400).json({message});
    }
    next();
 }

 export default validRole;