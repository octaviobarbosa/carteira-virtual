import { inject, injectable } from "tsyringe";

import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class GetBalanceUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UserRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<object> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const balance = await this.transactionsRepository.getBalance(user_id);

    return balance;
  }
}

export { GetBalanceUseCase };
