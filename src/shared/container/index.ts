import { container } from "tsyringe";
import { IUsersRepository } from "../../modules/users/repositories/IUsersRepository";
import { UsersRepository } from "../../modules/users/repositories/UsersRepository";

import { ITransactionsRepository } from "../../modules/transactions/repositories/ITransactionsRepository";
import { TransactionsRepository } from "../../modules/transactions/repositories/TransactionsRepository";

import { ICategoriesRepository } from "../../modules/categories/repositories/ICategoriesRepository";
import { CategoriesRepository } from "../../modules/categories/repositories/CategoriesRepository";

import { ITransactionLogsRepository } from "../../modules/transactions/repositories/ITransactionLogsRepository";
import { TransactionLogsRepository } from "../../modules/transactions/repositories/TransactionLogsRepository";

container.registerSingleton<IUsersRepository>(
  "UserRepository",
  UsersRepository,
);
container.registerSingleton<ITransactionsRepository>(
  "TransactionsRepository",
  TransactionsRepository,
);
container.registerSingleton<ICategoriesRepository>(
  "CategoriesRepository",
  CategoriesRepository,
);
container.registerSingleton<ITransactionLogsRepository>(
  "TransactionLogsRepository",
  TransactionLogsRepository,
);
