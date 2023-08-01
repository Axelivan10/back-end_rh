import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
const cloudinaryInstance = cloudinary;
import { CloudinaryStorage } from 'multer-storage-cloudinary';

// Configura Cloudinary
cloudinaryInstance.config({
  cloud_name: 'djau2etka',
  api_key: '556928129542566',
  api_secret: 'KMcNKoI-sLjVEmWYJvCWxuObV28',
});

// Crea una instancia de CloudinaryStorage
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryInstance,
  params: {
    folder: 'AVATARS_FOLDER',
    allowed_formats: ['jpg', 'jpeg', 'png'],
  },
});

// Configura Multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

// Middleware para subir una imagen
export const uploadImage = (req, res, next) => {
  upload.single('avatar')(req, res, (err) => {
    if (err) {
      return next(err);
    }
    next();
  });
};
