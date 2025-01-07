import cloudinary from "cloudinary";
import { BadRequestError } from "../request-errors/index.js";
import dotenv from "dotenv";
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const cloudinaryProfileImageUpload = async (req) => {
    const file = req.file;
    let profileImage;
    if (!file) {
        throw new BadRequestError("Please upload an image.");
    }
    await cloudinary.v2.uploader.upload(
        file.path,
        {
            folder: "real-estate-system/profileImages",
            width: 500,
            height: 500,
            crop: "fill",
        },
        (err, result) => {
            if (err) {
                throw new BadRequestError("Error uploading image");
            }
            profileImage = result.secure_url;
        }
    );
    return profileImage;
};