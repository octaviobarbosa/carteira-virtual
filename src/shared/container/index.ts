import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";
import { UserRepository } from "../../modules/user/repositories/UserRepository";

import { IWalletRepository } from "../../modules/wallet/repositories/IWalletRepository";
import { WalletRepository } from "../../modules/wallet/repositories/WalletRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IWalletRepository>(
  "WalletRepository",
  WalletRepository,
);
