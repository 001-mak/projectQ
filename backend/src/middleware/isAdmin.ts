import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export const isAdmin = (req: any, res: Response, next: NextFunction) => {
  const bearerHeader = req.headers["authorization"];
  if (!bearerHeader) {
    return res.status(401).json("Please login");
  }
  const token = bearerHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    console.log(user.tokenData);
    if (err) return res.status(403).send("Not Authorized");
    if (user.tokenData.userType == "admin") {
      console.log("ok, admin found");
      return next();
    } else {
      return res.status(403).json({ message: "Access Forbidden" });
    }
  });
};
