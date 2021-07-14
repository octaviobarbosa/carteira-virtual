import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ITransactionsRepository } from "../../../transactions/repositories/ITransactionsRepository";

interface IPayDTO {
  user_id: string;
  payment_id: string;
}

@injectable()
class ReversePaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ user_id, payment_id }: IPayDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const payment = await this.paymentsRepository.findById(payment_id);

    if (!payment) {
      throw new AppError("Payment not found!");
    }

    if (payment.user_id != user_id) {
      throw new AppError("User different of Payment owner!");
    }

    await this.paymentsRepository.reverse(payment_id);

    await this.transactionsRepository.deleteByPaymentId(payment_id);
  }
}

export { ReversePaymentUseCase };
