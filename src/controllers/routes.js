import models from '../database/models';


const createRoutes=async(req,res)=>{
    try{
        const newRoute=await models.Routes.create(req.body);
        
         return res.status(201).json({
            newRoute
        });
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
};

const getRoutes=async (req,res)=>{
    try{
        const routes=await models.Routes.findAll();
        return res.status(200).json({routes});
    }catch(err){
        return res.status(500).json({err:err.message});
    }
};
const getOneRoute=async (req,res)=>{
   try{
       const {routeId}=req.params;
       const route=await models.Routes.findOne({
           where:{id:routeId},
       });
       if(route){
           return res.status(200).json({route});
       }
       return res.status(401).json({message:'No Route with that Id'});
   }
   catch(err){
       return res.status(500).json({err:err.message});
   }
};
const updateRoute=async (req,res)=>{
    try{
        const {routeId}=req.params;
        const[updated]=await models.Routes.update(req.body,{where:{id:routeId}});
        if(updated){
            const updateRoute=await models.Routes.findOne({where:{id:routeId}});
            return res.status(200).json({route:updateRoute});
        }
    }
    catch(err){
        return res.status(500).json({err:err.message});
    }
};
const deleteRoute=async(req,res)=>{
    try{
        const {routeId}=req.params;
        const deleted=await models.Routes.destroy({
            where:{id:routeId}
        });
        if(deleted){
            return res.status(204).send("Route deleted");
        }
        throw new Error("Route Not Found");
    }catch(err){
        return res.status(500).json({err:err.message});
    }
}

module.exports={
    createRoutes,
    getRoutes,
    getOneRoute,
    updateRoute,
    deleteRoute
}