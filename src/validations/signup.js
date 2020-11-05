import Joi from "@hapi/joi";

export const signup = Joi.object().keys({
  firstname: Joi.string().min(5).max(15).required(),
  lastname: Joi.string().min(5).max(15).required(),
  email: Joi.string().email().required(),
  dateofbirth: Joi.string().min(5).max(15).required(),
  gender: Joi.string().min(3).max(15).required(),
  address: Joi.string().min(5).max(15).required(),
  role: Joi.string().min(3).max(15).required(),
});

export const validationError = (req, res, next) => {
  const { error } = signup.validate(req.body);
 console.log(`this is ereq ${JSON.stringify(req.body)}`);
  if (error) {
    return res.status(400).json({
      status: 400,
      message: error.details[0].message.replace(/"/g, ""),
    });
  }
  next();
};
