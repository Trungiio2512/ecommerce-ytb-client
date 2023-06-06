import Joi from "joi";
const title = Joi.string().required();
const price = Joi.number().min(100000).required();
const quantity = Joi.number().min(1).required();
const brand = Joi.required();
const category = Joi.required();
const thumb = Joi.required();
const images = Joi.required();

const rams = Joi.array().items(Joi.required());
const internals = Joi.array().items(Joi.required());
const colors = Joi.array().items(Joi.required());
export const validateProduct = (data) => {
  const { error, value } = Joi.object({
    title,
    price,
    quantity,
    brand,
    category,
    thumb,
    images,
    rams,
    internals,
    colors,
  }).validate(data);
  return { error, value };
};
