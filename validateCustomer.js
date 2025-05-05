const Joi = require('joi');

const customerSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.empty': 'Name cannot be empty',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name cannot be more than 100 characters'
  }),
  phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
    'string.empty': 'Phone number cannot be empty',
    'string.pattern.base': 'Phone number must be exactly 10 digits'
  }),
  address: Joi.string().min(5).max(255).required().messages({
    'string.empty': 'Address cannot be empty',
    'string.min': 'Address must be at least 5 characters',
    'string.max': 'Address cannot be more than 255 characters'
  }),
  trustScore: Joi.number().min(0).max(100).optional().messages({
    'number.base': 'Trust score must be a number',
    'number.min': 'Trust score must be between 0 and 100',
    'number.max': 'Trust score must be between 0 and 100'
  })
});

const validateCustomer = (data) => {
  return customerSchema.validate(data, { abortEarly: false });
};

module.exports = validateCustomer;