import Joi from "joi";

export const joiUsername = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
});

// export const joipassword = Joi.object({
//   password: Joi.string().pattern(
//     new RegExp("^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$")
//   ),
// });

export const joipassword = Joi.object({
  password: Joi.string()
});

export const joiemail = Joi.object({
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});
