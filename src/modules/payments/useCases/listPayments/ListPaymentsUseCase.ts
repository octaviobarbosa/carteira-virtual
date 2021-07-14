import { inject, injectable } from "tsyringe";

import { IPaymentsRepository } from "../../repositories/IPaymentsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { Payment } from "../../entities/Payment";

interface IRequest {
  user_id: string;
}

@injectable()
class ListPaymentsUseCase {
  constructor(
    @inject("PaymentsRepository")
    private paymentsRepository: IPaymentsRepository,
    @inject("UsersRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<Payment[]> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const payments = await this.paymentsRepository.findByUserId(user_id);

    return payments;
  }
}

export { ListPaymentsUseCase };
