import multer from "multer";
import logger from "../logs/winston";

const imageservice = (userId) => {
  const upload = multer({ dest: `../uploads/avatars/${userId}/` });
  try {
    return upload.single("avatar");
  } catch (error) {
    return logger.error(error);
  }
};
export default imageservice;
