import multer from "multer";
import logger from "../logs/winston";

const imageservice = (userId) => {

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })
  
  const upload = multer({dest: 'uploads/'})
  try {
    console.log(userId)
    return upload.single("avatar");
  } catch (error) {
    return logger.error(error);
  }
};
export default imageservice;
