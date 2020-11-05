import Joi from "@hapi/joi";
const emailValidator = (req, res, next) => {
    const userValidation = Joi.object({
        email: Joi.string()
        .required()
        .email()                     
        .messages({ 
             "string.email": res.__("provide valid email"),
             "any.required": res.__('email is required'),
             "string.empty": res.__('Email must not be empty')
         })
    });
    const result = userValidation.validate(req.body);
    if (result.error) return res.status(400).json({ message: result.error.details[0].message });
    next();
}
export default emailValidator
