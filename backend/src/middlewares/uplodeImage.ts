import multer, { FileFilterCallback } from 'multer';
import path from "path";

// Configure Multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'src/uploads/'); // Save files in the 'uploads' folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

export const uplodeimg = multer({ storage: storage });