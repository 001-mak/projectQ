import { Request, Response } from "express";
// import { getUserData } from "../utils/getUserFromToken";
import prisma from "../../db/db";
import logger from "../logs/winston";
import imageservice from "../service/imageservice";

export const uploadAvatar = async ()=>{

}

export const createProfile = async (req: Request, res: Response) => {
  try {
    //entry to profile table
    const profile = await prisma.profile.create({
      data: req.body,
    });
    console.log(profile)
    return res.status(200).json({ message: "User Profile Created", profile });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "ERROR OCCURED" });
  }
};

export const createProfileCategory = async (req: Request, res: Response) => {
  const { profileId, category } = req.body;
  try {
    const profileCategory = await prisma.profileCategory.create({
      data: {
        category,
        profileId,
      },
    });
    return res
      .status(200)
      .json({ message: "Categoray Added", category: profileCategory.category });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const createProfilePlatform = async (req: Request, res: Response) => {
  const { platformName, profileLink, profileId } = req.body;

  try {
    const profilePlatform = await prisma.profilePlatform.create({
      data: {
        platformName,
        profileLink,
        profileId,
      },
    });
    return res
      .status(200)
      .json({ message: "Social Profile Link Added", profilePlatform });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "ERROR OCCURED" });
  }
};

export const createPackage = async (req: Request, res: Response) => {
  const { pkgTitle, pkgPrice, platformName, profileId } = req.body;
  try {
    const pkg = await prisma.package.create({
      data: {
        pkgTitle,
        pkgPrice,
        platformName,
        profileId,
      },
    });
    return res.status(200).json({ messgae: "package created", pkg });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

export const deleteProfile = async (res: Response, req: Request) => {
  const userId = req.body.profileId as number;
  try {
    await prisma.profile.delete({
      where: {
        userId,
      },
    });
    return res.status(200).json("Profile deleted");
  } catch (error) {
    logger.error({ message: "server side error", error });
    return res
      .status(500)
      .json({ message: "ERROR OCCURED, couldnt delete profile" });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  const { userId } = req.body;
  const { updatedData } = req.body;

  try {
    await prisma.profile.update({
      where: {
        userId,
      },
      data: updatedData,
    });
    return res.status(200).json({ message: "profile data updated" });
  } catch (error) {
    logger.error(error);
    return res.status(500).json({ message: "server error" });
  }
};

//PUBLIC PROFILE LISTING

export const getProfilesList = async (req: Request, res: Response) => {
  let platform = undefined;
  let category = undefined;
  let country = undefined;
  let city = undefined;

  if (req.params.platform) platform = req.params.platform;
  if (req.params.category) category = req.params.category;
  if (req.params.country) country = req.params.country;
  if (req.params.city) city = req.params.city;

  try {
    const userList = await prisma.appUser.findMany({
      where: {
        userType: "seller",
        Profile: {
          isNot: null,
        },
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        username: true,

        Profile: {
          where: {
            country: country,
            city: city,
          },
          select: {
            id: true,
            avatar: true,
            tagLine: true,
            city: true,
            country: true,

            profilePlatform: {
              where: {
                platformName: platform,
              },
              select: {
                id: true,
                platformName: true,
                profileLink: true,
              },
            },
            profileCategory: {
              select: {
                category: true,
              },
            },
            package: {
              where: {
                platformName: platform,
              },
              select: {
                id: true,
                pkgPrice: true,
              },
            },
          },
        },
      },
    });
    console.log(userList);
    return res.status(200).json({ userList });
  } catch (error) {
    console.log("error");
    return res.status(500).json({ error });
  }
};

export const getSellerProfile = (req: Request, res: Response) => {
  const { profileId } = req.body;

  const sellerProfile = prisma.profile.findUnique({
    where: {
      id: profileId,
    },
    select: {
      id: true,
      avatar: true,
      tagLine: true,
      city: true,
      country: true,

      profilePlatform: {
        select: {
          id: true,
          platformName: true,
          profileLink: true,
        },
      },
      profileCategory: {
        select: {
          category: true,
        },
      },
      package: {
        select: {
          id: true,
          pkgTitle: true,
          pkgPrice: true,
        },
      },
    },
  });
};
