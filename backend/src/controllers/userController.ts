import { Request, Response } from "express";
import prisma from "../../db/db";
import logger from "../logs/winston";

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
  const querySearchTerm = req.query
  const {page, pageSize} = req.query
  console.log(querySearchTerm.querySearchTerm)
  const searchQuery: string = req.query.querySearchTerm as string ?? ""

  try {
    const users = await prisma.appUser.findMany({
      where:{
        OR: [
          {
            username: {
              contains: searchQuery,
              mode: 'insensitive',
            },
            email: {
              contains: searchQuery, 
              mode: 'insensitive',
            },
          },
        ]
      },
      skip: (+page - 1) * +pageSize,
    take: +pageSize,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        username: true,
        userType: true,
        emailVerified: true,
      },
    });
    return res.status(200).json(users);
  } catch (error) {
    console.log(error)
    return res.status(404).json({
      message: "Users Not found",
      error
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
    console.log(error)
    return res.status(404).json({
      message: "User Not found",
      error
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