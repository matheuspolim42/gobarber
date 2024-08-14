import IStorageProvider from "../models/IStorageProvider";
import fs from "fs";
import uploadConfig from "../../../../config/uploadConfig";
import path from "path";
import AppError from "../../../errors/AppError";

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
      await fs.promises.rename(
        path.resolve(uploadConfig.tmpFolder, file),
        path.resolve(uploadConfig.uploadFolder, 'uploads', file),
      )

      return file;
  }

  public async delFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadFolder, file);

    await fs.promises.stat(filePath);

    await fs.promises.unlink(filePath);
  }
};

export default DiskStorageProvider;
