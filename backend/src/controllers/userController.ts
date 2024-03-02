import { Request, Response } from "express";
import prisma from "../../db/db";

export const getUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  try {
    const user = await prisma.appUser.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        userType: true,
      },
    });
     
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ 
      message: "User Not found",
    });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.appUser.findMany({
      // where:{
      //   OR: [
      //     { userType: 'buyer' },
      //     { userType: 'seller' }
      //   ]
      // },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,
        userType: true,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(404).json({
      message: "Users Not found",
    });
  }
};

export const deleteUser = async(req:Request, res:Response)=>{
    const id: number = parseInt(req.params.id);
  try {
    const user = await prisma.appUser.delete({
      where: {
        id,
      },
    });
    return res.status(200).json({message:"User Deleted",user});
  } catch (error) {
    return res.status(404).json({
      message: "User Not found",
    });
  }
}

// export const updateUser = async(req:Request, res:Response)=>{
//     const updatedData= req.body;
//   try {
//     const user = await prisma.user.update({
//       where: {

//       },
//     });
//     res.status(200).json({message:"User Deleted",user});
//   } catch (error) {
//     res.status(404).json({
//       message: "User Not found",
//     });
//   }
// }