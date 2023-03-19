import Joi from 'joi';

export const createUserValidation = async (data: Object) => {
  console.log('Inside create User validator');

  const Schema = Joi.object({
    email: Joi.string().required(),
    name: Joi.string().required(),
    countryCode: Joi.string().required(),
    mobileNumber: Joi.string().required(),
    dob: Joi.date().required(),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = 'Success Validation';

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }

  return { error, message };
};

export const updateUserValidation = async (data: Object) => {
  console.log('Inside update User validator');

  const Schema = Joi.object({
    email: Joi.string(),
    name: Joi.string(),
    countryCode: Joi.string(),
    mobileNumber: Joi.string(),
    dob: Joi.date(),
  });

  const validate = Schema.validate(data);
  let error = false;
  let message = 'Success Validation';

  if (validate.error) {
    message = validate.error.details[0].message;
    message = message.replace(/"/g, '');
    error = true;
  }

  return { error, message };
};
