import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Transaction } from "../../entities/Transaction";

interface IRequest {
  user_id: string;
}

@injectable()
class ListTransactionsUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Transaction[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const transactions = await this.transactionsRepository.findByUserId(
      user_id,
    );

    return transactions;
  }
}

export { ListTransactionsUseCase };
