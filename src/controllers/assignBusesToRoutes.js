import Sequelize from 'sequelize';
import { paginate } from 'paginate-info';
import Models from '../database/models';
import AssignBusesToRoutesResponses from '../utils/assignBusesToRoutes';

const { Op } = Sequelize;

const { Buses, Routes } = Models;

class assign {
  static async assignRoute(req, res) {
    try {
      const findRoute = await Routes.findOne({
        where: { routeID: req.body.routeID },
      });

      const updated = await Buses.update({ routeId: findRoute.id },
        { where: { id: req.params.id } });

      if (updated) {
        const assignedBus = await Buses.findOne({
          where: { id: req.params.id },
          include: [{
            model: Routes,
            as: 'route',
            attributes: ['id', 'direction', 'routeID'],
          }],
        });
        return AssignBusesToRoutesResponses(res, 200, 'the bus was assigned successfully', assignedBus);
      }
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }

  static async busesAssignedToRoutes(req, res) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;
      const { rows, count } = await Buses.findAndCountAll({
        page,
        limit,
        where: { routeId: { [Op.ne]: null } },
        include: [{
          model: Routes,
          as: 'route',
          attributes: ['id', 'direction', 'routeID'],
        }],
      });
      const pagination = paginate(page, count, rows, limit);

      if (offset >= count) {
        return AssignBusesToRoutesResponses(res, 404, 'This page does not exist');
      }

      return AssignBusesToRoutesResponses(res, 200, 'Here are the buses assigned to routes', pagination, rows);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default assign;
