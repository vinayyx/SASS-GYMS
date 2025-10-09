import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudnary.js"; // correct spelling

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "gym_members", // Folder Name
    allowed_formats: ["jpg", "jpeg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }],
  },
});

 const upload = multer({ storage });

 export default upload
