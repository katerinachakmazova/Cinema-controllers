  const yup = require('yup');
  const PERSON_VALIDATION_SCHEMA= yup.object().shape(
    {
      full_name: yup.string().trim().min(5).max(35).required(),
      birth_year: yup.date().min('1870-01-01').max('2024-01-01').nullable(),
      birth_year: yup.date().nullable()
    }
  )
  module.exports = PERSON_VALIDATION_SCHEMA;
