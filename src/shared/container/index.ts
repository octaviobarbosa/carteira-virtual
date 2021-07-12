import { container } from "tsyringe";
import { IUserRepository } from "../../modules/user/repositories/IUserRepository";
import { UserRepository } from "../../modules/user/repositories/UserRepository";

import { IWalletRepository } from "../../modules/wallet/repositories/IWalletRepository";
import { WalletRepository } from "../../modules/wallet/repositories/WalletRepository";

import { ICategoryRepository } from "../../modules/category/repositories/ICategoryRepository";
import { CategoryRepository } from "../../modules/category/repositories/CategoryRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IWalletRepository>(
  "WalletRepository",
  WalletRepository,
);
container.registerSingleton<ICategoryRepository>(
  "CategoryRepository",
  CategoryRepository,
);
