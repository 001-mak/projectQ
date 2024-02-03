import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const getUserData = (req: Request, res: Response) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json("Please login");
  }
  const token = bearerHeader.split(" ")[1];
  try {
    const userData = jwt.verify(token, process.env.JWT_KEY);
    return userData;
  } catch (error) {
    if (error) return res.status(403).send("Not Authorized");
  }
};
