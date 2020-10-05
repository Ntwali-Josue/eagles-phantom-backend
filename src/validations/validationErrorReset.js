import Joi from '@hapi/joi';

export const reset = Joi.object().keys({
  newpassword: Joi.string().min(5).max(50).required(),
  confirmation: Joi.string().min(5).max(50).required(),
});

export const validationErrorReset = (req, res, next) => {
  const { err } = reset.validate(req.body);
  if (err) {
    res.status(400).json({
      status: 400,
      message: err.details[0].message.replace(/"/g, ''),
    });
  }
  next();
};
