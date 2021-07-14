import { inject, injectable } from "tsyringe";

import { AppError } from "../../../../errors/AppError";
import { ICreatePaymentDTO } from "../../../payments/dtos/ICreatePaymentDTO";
import { IPaymentsRepository } from "../../../payments/repositories/IPaymentsRepository";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

@injectable()
class CreatePaymentUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({
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

    if (!repeat) {
      await this.paymentsRepository.create({
        user_id,
        type,
        description,
        value,
        due_date,
        payment_date,
        is_automatic_debt,
      });
    }

    for (let i = 0; i < repeat; i++) {
      let date = new Date(due_date);

      if (i > 0) {
        date = new Date(date.setMonth(date.getMonth() + i));
      }

      await this.paymentsRepository.create({
        user_id,
        type,
        description,
        value,
        due_date: date,
        payment_date,
        is_automatic_debt,
      });
    }
  }
}

export { CreatePaymentUseCase };
