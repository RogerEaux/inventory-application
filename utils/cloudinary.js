import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const cloudUpload = async (imagePath) => {
  const options = {
    use_filename: true,
    unique_filename: true,
  };

  try {
    const result = await cloudinary.uploader.upload(imagePath, options);
    console.log(result.public_id);
    return result.secure_url;
  } catch (error) {
    throw new Error(error);
  }
};

export default cloudUpload;
