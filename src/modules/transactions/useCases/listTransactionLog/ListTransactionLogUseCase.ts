import { inject, injectable } from "tsyringe";

import { ITransactionLogsRepository } from "../../repositories/ITransactionLogsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { TransactionLog } from "../../entities/TransactionLog";

interface IRequest {
  user_id?: string;
  start?: Date;
  end?: Date;
}

@injectable()
class ListTransactionLogUseCase {
  constructor(
    @inject("TransactionLogsRepository")
    private transactionLogsRepository: ITransactionLogsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, start, end }: IRequest): Promise<TransactionLog[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const logs = await this.transactionLogsRepository.findByUserId(
      user_id,
      start,
      end,
    );

    return logs;
  }
}

export { ListTransactionLogUseCase };
