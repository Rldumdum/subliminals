const { check, validationResult } = require("express-validator");

const validateUserSignUp = [
  check("firstName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("First Name is required")
    .isString()
    .withMessage("First Name must be a string")
    .isLength({ min: 2, max: 20 }),
  check("lastName")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Last Name is required")
    .isString()
    .withMessage("Last Name must be a string")
    .isLength({ min: 2, max: 20 }),
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 20 }),
  check("password")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Password is Empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Password must be 3 to 20 characters long"),
  check("confirmPassword")
    .trim()
    .not()
    .isEmpty()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Both passwords must be the same");
      }
      return true;
    }),
  check("birthday")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Birthday is Empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("Birthday must not be empty"),
  check("gender")
    .trim()
    .not()
    .isEmpty()
    .withMessage("gender is Empty")
    .isLength({ min: 3, max: 20 })
    .withMessage("gender must not be empty"),
];

const userValidation = (req, res, next) => {
  const result = validationResult(req).array();
  console.log(result);
  if (!result.length) return next();

  const error = result[0].msg;
  res.json({ success: false, message: error });
};

const validateUserSignIn = [
  check("username")
    .trim()
    .not()
    .isEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a string")
    .isLength({ min: 3, max: 20 }),
];

module.exports = { validateUserSignUp, validateUserSignIn, userValidation };
