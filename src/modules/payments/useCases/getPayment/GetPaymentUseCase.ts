import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ITransactionsRepository } from "../../../transactions/repositories/ITransactionsRepository";
import { Payment } from "modules/payments/entities/Payment";

@injectable()
class GetPaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute(user_id: string, payment_id: string): Promise<Payment> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const payment = await this.paymentsRepository.findById(payment_id);

    if (!payment) {
      throw new AppError("Payment not found!");
    }

    return payment;
  }
}

export { GetPaymentUseCase };
