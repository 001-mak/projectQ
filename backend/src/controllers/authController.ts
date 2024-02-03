import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import prisma from "../../db/db";
import emailService from "../service/emailservice";
import { joiUsername, joiemail, joipassword } from "../utils/joiValidation";
import { appUser } from "../interfaces/userInterface";
import logger from "../logs/winston";

export const register = async (req: Request, res: Response): Promise<any> => {
  const { userType, firstName, lastName, username, email, password }: appUser =
    req.body;

  try {
    await joiemail.validateAsync({ email });
    await joiUsername.validateAsync({ username });
    await joipassword.validateAsync({ password });
  } catch (error) {
    logger.error("Validation error during user registration:", error);
    return res
      .status(400)
      .json({ message: "BAD REQUEST: Joi validation error", error });
  }

  try {
    // Check if username or email already exists
    const existingUserEmail: appUser = await prisma.appUser.findUnique({
      where: {
        email,
      },
    });

    const existingUsername: appUser = await prisma.appUser.findUnique({
      where: {
        username,
      },
    });

    if (existingUsername) {
      logger.warn(`Username conflict during user registration:${username}`);
      return res.status(409).json({
        error: "Conflict",
        message: "Username already exists.",
      });
    } else if (existingUserEmail) {
      logger.warn(`Username conflict during user registration:${email}`);
      return res.status(409).json({
        error: "Conflict",
        message: "Email already exists.",
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashPassword: string = bcrypt.hashSync(password, salt);
      let roleId: number;
      let isAdmin = false;
      const token = jwt.sign(
        { userType, firstName, lastName, username },
        process.env.JWT_KEY
      );
      console.log(userType);
      switch (userType) {
        case "admin":
          roleId = 0;
          isAdmin = true;
          break;
        case "buyer":
          roleId = 1;
          break;
        case "seller":
          roleId = 2;
          break;

        default:
          break;
      }

      const newUser = await prisma.appUser.create({
        data: {
          userType,
          isAdmin,
          firstName,
          lastName,
          username,
          email,
          password: hashPassword,
          roleId,
          verificationToken: token,
          createdBy: username,
        },
      });

      //Send E-MAIL
      const emailVerificationURL = `localhost:3000/auth/verify?id=${token}`;
      emailService(email, emailVerificationURL);
      console.log(newUser);
      return res.status(200).json({ message: "User Registered" });
    }
  } catch (error) {
    logger.error(`Database query error during user registration:${error}`);
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  const token: string = req.query.id as string;
  console.log(token);
  let payload: string;
  try {
    payload = jwt.verify(token, process.env.JWT_KEY) as string;
    console.log(payload);
  } catch (error) {
    console.log(error);
  }
  const email: string = payload;
  console.log(email);
  // Find the user with the specified email
  try {
    const user = await prisma.appUser.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      // Update the emailVerified attribute to true
      await prisma.appUser.update({
        where: {
          email: email,
        },
        data: {
          emailVerified: true,
          verificationToken: null,
        },
      });

      console.log("Email verification status updated successfully.");
    }
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      message: "User not found for the given email address.",
      error,
    });
  }
  return res.status(200).send("Email verification successful");
  // res.redirect("/sign-in");
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    try {
      await joiemail.validateAsync({ email });
      await joipassword.validateAsync({ password });
    } catch (error) {
      return res.status(400).json({ error });
    }
    const user: appUser = await prisma.appUser.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return res.status(401).send("_User not found");

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.status(400).send("password not correct");
    const tokenData = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      userType: user.userType,
    };
    //GENERATE TOKEN
    const token = jwt.sign({ tokenData }, process.env.JWT_KEY);
    return res.status(200).json({
      token: token,
      data: tokenData,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred during login.",
      error,
    });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  const email: string = req.body.email as string;

  try {
    const user = await prisma.appUser.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) {
      return res.status(404).send("Email.con found");
    }
  } catch (error) {
    return res.status(404).send("Email.con found");
  }

  let token;
  try {
    token = jwt.sign(email, process.env.JWT_KEY);
  } catch (error) {
    console.log(error);
  }
  const key = uuidv4();
  const forgotPasswordUrl = `localhost/3000/forgot-password?key=${key}&token=${token}`;
  try {
    emailService(email, forgotPasswordUrl);
    return res.status(200).send("Email Sent");
  } catch (error) {
    console.log(error);
    return res.status(500).send("Error");
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  let email: string;
  const token: string = req.query.token as string;
  if (!(token && req.body.password && req.body.confirmPassword)) {
    return res.status(404).send("Missing pass and token info");
  }
  try {
    jwt.verify(token, process.env.JWT_KEY, (err, data) => {
      if (!err) {
        email = data as string;
      }
    });
  } catch (error) {
    console.log(error);
    return res.status(404).send("UNKNOWN ACCESS");
  }
  if (req.body.password !== req.body.confirmPassword) {
    return res.status(400).send("password not match");
  }
  try {
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = bcrypt.hashSync(req.body.password, salt);

    const user = await prisma.appUser.findUnique({
      where: {
        email: email,
      },
    });
    if (!user) return res.status(404).send("_User not found");
    if (user) {
      // Update the emailVerified attribute to true
      await prisma.appUser.update({
        where: {
          email: email,
        },
        data: {
          password: hashPassword,
        },
      });
      console.log("Password Updated.");
      return res.status(200).send("Password Updated");
    }
  } catch (error) {
    return res.status(500).send("error");
  }
};

// export const changePassword = async(req:Request, res:Response)=>{

// }
