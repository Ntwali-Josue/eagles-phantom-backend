import Joi from "@hapi/joi";

export const updateProfile = Joi.object().keys({
  firstname: Joi.string().min(5).max(15),
  lastname: Joi.string().min(5).max(15),
  dateofbirth: Joi.string().min(5).max(15),
  gender: Joi.string().min(3).max(15),
  address: Joi.string().min(5).max(15),
});

export const validation = (req, res, next) => {
  const { error } = updateProfile.validate(req.body);
  if (error) {
    return res.status(400).json({
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};
