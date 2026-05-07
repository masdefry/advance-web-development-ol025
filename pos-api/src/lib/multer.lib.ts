import { Request } from 'express';
import multer, { diskStorage, FileFilterCallback } from 'multer';
import path from 'path';
import { FILE_UPLOAD_DIRECTORY } from '../configs/dotenv.config';

export const multerUploads = {
  async uploads() {
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
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
      },
    });

    function fileFilter(
      req: Request,
      file: Express.Multer.File,
      cb: FileFilterCallback,
    ) {
      // The function should call `cb` with a boolean
      // to indicate if the file should be accepted

      // To reject this file pass `false`, like so:
      cb(null, false);

      // To accept the file pass `true`, like so:
      cb(null, true);

      // You can always pass an error if something goes wrong:
      cb(new Error("I don't have a clue!"));
    }

    return multer({ storage, fileFilter });
  },
};
