import { Request } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';
import { FILE_UPLOAD_DIRECTORY } from '../configs/dotenv.config';
import { AppError } from '../utils/app-error.util';

export const multerUploads = {
  uploads(acceptedFileExtension: string[]) {
    const storage = diskStorage({
      destination: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void,
      ) {
        const mainDirectory = path.join(process.cwd()); // pos-api
        cb(null, `${mainDirectory}/${FILE_UPLOAD_DIRECTORY}`);
      },
      filename: function (
        req: Request,
        file: Express.Multer.File,
        cb: (error: Error | null, destination: string) => void,
      ) {
        const originalNameArr = file.originalname.split('.');
        const originalExtension = originalNameArr[originalNameArr.length - 1];

        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, `${file.fieldname}-${uniqueSuffix}.${originalExtension}`);
      },
    });

    function fileFilter(
      req: Request,
      file: Express.Multer.File,  
      cb: FileFilterCallback,
    ) {
      console.log(file);

      const originalNameArr = file.originalname.split('.');
      const originalExtension = originalNameArr[originalNameArr.length - 1];

      if (!acceptedFileExtension.includes(originalExtension)) {
        cb(AppError('Format file not accepted', 415));
      }

      cb(null, true);
    }

    return multer({ storage, fileFilter });
  },
};
