const PERSON_VALIDATION_SCHEMA = require('../utils/validationSchemas')

module.exports.validatePerson = async (req, res, next) => {
  const {body} = req;
  try {
    const validatedPerson = await PERSON_VALIDATION_SCHEMA.validate(body);
    req.body = validatedPerson;
    next();
  } catch (error) {
    next(`Error is ${error.errors}`)
  }

}