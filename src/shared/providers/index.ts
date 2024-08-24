import { container } from "tsyringe";

import DiskStorageProvider from "./StorageProvider/implementations/DiskStorageProvider";
import type IStorageProvider from "./StorageProvider/models/IStorageProvider";

import EtherealMailProvider from "./MailProvider/implementations/EtherealMailProvider";
import type IMailProvider from "./MailProvider/models/IMailProvider";

import HandleBarsMailTemplateProvider from "./MailTemplateProvider/implementations/HandleBarsMailTemplateProvider";
import type IMailTemplateProvider from "./MailTemplateProvider/models/IMailTemplateProvider";

container.registerSingleton<IStorageProvider>(
	"StorageProvider",
	DiskStorageProvider,
);

container.registerSingleton<IMailTemplateProvider>(
	"MailTemplateProvider",
	HandleBarsMailTemplateProvider,
);

container.registerInstance<IMailProvider>(
	"MailProvider",
	container.resolve(EtherealMailProvider),
);
