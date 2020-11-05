import Joi from '@hapi/joi';

const busInfo = (req) => {
  const schema = Joi.object().keys({
    busPlate: Joi.string().min(7).required().exist(),
    busStatus: Joi.string().valid('active', 'inactive').default('inactive'),
    busLocation: Joi.string().valid(),
    busCompany: Joi.string().valid(),
    busSeats: Joi.number().valid().not(0).positive(),
  });
  return schema.validate(req.body);
};

const busUpdate = (req) => {
  const schema = Joi.object().keys({
    busPlate: Joi.string().min(7).required(),
    busStatus: Joi.string().valid('active', 'inactive').default('inactive'),
    busLocation: Joi.string().valid(),
    busCompany: Joi.string().valid(),
    busSeats: Joi.number().valid().not(0).positive(),
  });

  return schema.validate(req.body);
};

export { busInfo, busUpdate };