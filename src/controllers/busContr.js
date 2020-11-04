import models from '../database/models';

const getBusByPlateNum=async(req,res)=>{
    try{
        const{busPlate}=req.params;
        const bus=await models.Buses.findOne({
            where:{busPlate:busPlate},
        });
        if(bus){
            return res.status(200).json({bus});
        }
        return res.status(404).send('Bus with specified Plate Number does not exist');
    }catch(error){ 
        return res.status(500).send(error.message);
    }
}

module.exports={
    getBusByPlateNum
}