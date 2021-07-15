import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Transaction } from "modules/transactions/entities/Transaction";

@injectable()
class ListFriendTransactionsUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string): Promise<Transaction[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const transactions =
      await this.transactionsRepository.getFriendsTransactions(user_id);

    return transactions;
  }
}

export { ListFriendTransactionsUseCase };
