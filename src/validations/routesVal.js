import Joi from '@hapi/joi';

export const routesVal=async(req,res,next)=>{
    const validRoutes=Joi.object({
    origin: Joi.string().min(4).required(),
    price: Joi.number().integer().min(3).required(),
    destination: Joi.string().min(2).required(),
    });

   const request=validRoutes.validate(req.body);
   if(request.error){
      let message, error=request.error.details[0].message;
    return res.status(400).json({
       message:error.replace(/"/g,""),
    });
   };
    next();
 };

 export const updRoutesVal=async(req,res,next)=>{
   const validRoutes=Joi.object({

   price: Joi.number().integer().min(100).required(),
   });

  const request=validRoutes.validate(req.body);
  if(request.error){
     let message, error=request.error.details[0].message;
   return res.status(400).json({
      message:error.replace(/"/g,""),
   });
  };
   next();
};

module.exports={
   routesVal,
   updRoutesVal
}