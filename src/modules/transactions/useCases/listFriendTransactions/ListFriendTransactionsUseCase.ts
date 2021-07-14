import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ITransactionLogsRepository } from "../../repositories/ITransactionLogsRepository";
import { Transaction } from "modules/transactions/entities/Transaction";

interface Balance {
  income: number;
  outcome: number;
  balance: number;
}

@injectable()
class ListFriendTransactionsUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TransactionLogsRepository")
    private transactionLogsRepository: ITransactionLogsRepository,
  ) {}

  async execute(user_id: string): Promise<Transaction[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const checkBalance: Balance = await this.transactionsRepository.getBalance(
      user_id,
    );

    if (checkBalance.balance <= 0) {
      throw new AppError("You no have funds!");
    }

    const transactions =
      await this.transactionsRepository.getFriendsTransactions(user_id);

    return transactions;
  }
}

export { ListFriendTransactionsUseCase };
