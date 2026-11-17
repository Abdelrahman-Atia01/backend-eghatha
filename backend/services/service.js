
import multer from "multer";
import ApiError from '../src/utils/apiError.js'

export const multerFun = () => {

    const storage = multer.diskStorage({
        // 1. Destination
        destination: function (req, file, cb) {
            cb(null, "uploads");
        },

        // 2. File Name
        filename: function (req, file, cb) {
            cb(null, Date.now() + "-" + file.originalname);
        }
    });

    // 3. File Filter
    const fileFilter = (req, file, cb) => {

        const allowedMimeTypes = [
            "image/jpeg",
            "image/png",
            "image/gif",
            "image/webp",
            "image/bmp",
            "image/svg+xml",
            "image/tiff",
            "image/avif"
            // "application/pdf"
        ];

        if (allowedMimeTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new ApiError("Only image files are allowed!",400), false);
        }
    };

    const uploadFiles = multer({
        fileFilter,
        storage
    });

    return uploadFiles;
};
