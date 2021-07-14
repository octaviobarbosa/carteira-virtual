import { inject, injectable } from "tsyringe";

import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ITransactionLogsRepository } from "../../repositories/ITransactionLogsRepository";

interface ISendTransaction {
  user_id: string;
  value: number;
  description: string;
  send_user_id: string;
}

interface Balance {
  income: number;
  outcome: number;
  balance: number;
}

@injectable()
class SendTransactionUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TransactionLogsRepository")
    private transactionLogsRepository: ITransactionLogsRepository,
  ) {}

  async execute({
    user_id,
    value,
    description,
    send_user_id,
  }: ISendTransaction): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const sendUserExists = await this.usersRepository.findById(send_user_id);

    if (!sendUserExists) {
      throw new AppError("Send User not found!");
    }

    const checkBalance: Balance = await this.transactionsRepository.getBalance(
      user_id,
    );

    if (checkBalance.balance <= 0) {
      throw new AppError("You no have funds!");
    }

    // to user
    await this.transactionsRepository.create({
      user_id,
      operation: "O",
      value,
      description,
      to_user_id: send_user_id,
    });

    // from user
    await this.transactionsRepository.create({
      user_id: send_user_id,
      operation: "I",
      value,
      description,
      from_user_id: user_id,
    });

    // log
    const date = new Date();

    await this.transactionLogsRepository.create({
      user_id,
      date,
      operation: "O",
      value,
      log: `Pagamento enviado para ${
        sendUserExists.name
      } no valor de R$ ${value} em ${date.toLocaleDateString("pt-br")}`,
    });

    await this.transactionLogsRepository.create({
      user_id: send_user_id,
      date,
      operation: "I",
      value,
      log: `Pagamento recebido de ${
        userExists.name
      } no valor de R$ ${value} em ${date.toLocaleDateString("pt-br")}`,
    });
  }
}

export { SendTransactionUseCase };
