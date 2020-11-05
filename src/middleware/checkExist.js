import Model from '../database/models'
import Sequelize from 'sequelize'
const Op = Sequelize.Op

exports.checkID = async (req, res, next) => {
    const id = parseInt(req.params.id)
    const items = await Model.Bus.findAll()
    const IDs = items.map(item => item.id)
    if (!IDs.includes(id)) {
        res.status(404).json({
            message: res.__("bus doesn't exist")
        })
    }
    next()
}


exports.checkPlate = async (req, res, next) => {
    const findPlate = await Model.Bus.findOne({ where: { busPlate: req.body.busPlate } })
    if (findPlate) {
        res.status(409).json({
            message: res.__("Bus with") + " " + req.body.busPlate + " " + res.__("already exist")
        })
        return false
    }
    next()
}

exports.checkRole = async (req, res, next) => {
   
    if (req.user.role != "driver") {
        res.status(401).json({
            message: res.__("user is not driver")
        })
        return false
    }
    next()
}

exports.checkAssigned = async (req, res, next) => {
    const findBus = await Model.Bus.findOne({ where: { id: req.params.id } })
    if (findBus.userId != null) {
        res.status(409).json({
            message: res.__("Bus with") + " " + findBus.busPlate + " " + res.__("already assigned")
        })
        return false
    }
    next()
}

exports.ckeckUserEmail=async(req,res,next)=>{

    const user = await Model.Users.findOne({ where: {email: req.body.email } })
    if (!user) {
              res.status(404).json({
               status: 404,
               message: res.__('Email is not found'),
             });
             return false
         }
         req.user=user
         next()
}

exports.checkDriverAssigned = async (req, res, next) => {
    const buses = await Model.Bus.findAll({where: { userId: { [Op.ne]: null } }})
    const userIds = buses.map(bus => bus.userId)
    console.log(userIds)
    if (userIds.includes(req.user.id)) {
        res.status(409).json({
            message: res.__("Driver is already assigned")
        })
        return false
    }
    next()
}

exports.checkAssignment = async (req, res, next) => {
   const bus=await Model.Bus.findOne({where:{userId:req.user.id}})
    if (!bus) {
        res.status(401).json({
            message: res.__("user is not assigned to bus")
        })
        return false
    }
    next()
}
