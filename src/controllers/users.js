import models from '../database/models';
const { Op } = require('sequelize');
const getUsers=async(req,res)=>{
    try{
     const users = await models.Users.findAll({
        where: {
            [Op.or]: [
              { role: 'driver' },
              { role: 'operator' },
            ],
          },
          attributes: {
            exclude: ['password'],
          },
     });
     return res.status(200).json({ users });
    }
    catch(err){
     return res.status(500).json({error:err.message});
    }
};
const getUserbyId=async (req,res)=>{
  try{
      const { userId }=req.params;
      const user=await models.Users.findOne({
          where:{id:userId}, 
           attributes: {
            exclude: ['password'],
          },
      });
      if(user){
          return res.status(200).json({user});
      }
      return res.status(404).send('no User with that Id');
  }catch(err){
      return res.status(500).send(err.message);
  }
};
const updateUser=async(req,res)=>{
    try{
        const {userId}=req.params;
        const[updated]=await models.Users.update(req.body,{
            where:{id:userId}
        });
        if(updated){
            const updatedUser=await models.Users.findOne({where:{id:userId}});
           return res.status(200).json({user:updatedUser});
        }
        throw new Error('User does not found');
    }
    catch(err){
    return res.status(500).json({error:err.message});
}
};
module.exports={
    getUsers,
    updateUser,
    getUserbyId
  }