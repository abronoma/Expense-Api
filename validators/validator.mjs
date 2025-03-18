import Joi from 'joi';

export const validateExpense = (data) => {
  const schema = Joi.object({
    amount: Joi.number().required(),
    category: Joi.string().required(),
    date: Joi.date().optional(),
  });

  return schema.validate(data);
};