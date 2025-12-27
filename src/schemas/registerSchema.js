import * as zod from "zod";

const registerSchema = zod
  .object({
    firstName: zod.string().min(1),
    lastName: zod.string().min(1),
    email: zod.email().min(1),
    password: zod.string().min(8),
    password_confirmation: zod.string().min(1),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Confirm password doesn't match",
    path: ["password_confirmation"],

    // run if password & confirmPassword are valid
    when(payload) {
      return registerSchema
        .pick({ password: true, password_confirmation: true })
        .safeParse(payload.value).success;
    },
  });

export default registerSchema;
