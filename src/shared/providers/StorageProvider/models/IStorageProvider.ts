export default interface IStorageProvider {
  saveFile(file: string): Promise<string>;
  delFile(file: string): Promise<void>;
};
