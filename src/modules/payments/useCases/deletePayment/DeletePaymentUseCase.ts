import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

interface IDelete {
  user_id: string;
  payment_id: string;
}

@injectable()
class DeletePaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, payment_id }: IDelete): Promise<void> {
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
      throw new AppError("Payment closed, cannot be deleted!");
    }

    await this.paymentsRepository.delete(payment_id);
  }
}

export { DeletePaymentUseCase };
