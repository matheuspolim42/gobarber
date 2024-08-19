import IMailProvider from "../models/IMailProvider";

class EtherealMailProvider implements IMailProvider {
  public async sendMail(to: string, body: string): Promise<void> {
  };
};

export default EtherealMailProvider;