import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreatePaymentDTO } from "../../../payments/dtos/ICreatePaymentDTO";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

@injectable()
class UpdatePaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
    id,
    user_id,
    type,
    description,
    value,
    due_date,
    payment_date,
    is_automatic_debt,
    repeat,
  }: ICreatePaymentDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const payment = await this.paymentsRepository.findById(id);

    if (!payment) {
      throw new AppError("Payment not found!");
    }

    if (payment.user_id != user_id) {
      throw new AppError("User different of Payment owner!");
    }

    if (payment.payment_date) {
      throw new AppError("Payment closed, cannot be updated!");
    }

    await this.paymentsRepository.update({
      id,
      user_id,
      type,
      description,
      value,
      due_date,
      payment_date,
      is_automatic_debt,
    });
  }
}

export { UpdatePaymentUseCase };
