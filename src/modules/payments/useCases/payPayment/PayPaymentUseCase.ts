import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ITransactionsRepository } from "../../../transactions/repositories/ITransactionsRepository";

interface IPayDTO {
  user_id: string;
  payment_id: string;
  payment_date: Date;
}

@injectable()
class PayPaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
  ) {}

  async execute({ user_id, payment_id, payment_date }: IPayDTO): Promise<void> {
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

    if (payment.payment_date) {
      throw new AppError("Payment closed, cannot be edited!");
    }

    if (!payment_date) {
      throw new AppError("Payment date is null!");
    }

    await this.paymentsRepository.pay(payment_id, payment_date);

    await this.transactionsRepository.create({
      user_id,
      operation: payment.type === "R" ? "I" : "O",
      value: payment.value,
      description: `Baixa de conta à ${
        payment.type === "R" ? "receber" : "pagar"
      } realizado em ${new Date(payment_date).toLocaleDateString("pt-br")}`,
      payment_id,
    });
  }
}

export { PayPaymentUseCase };
