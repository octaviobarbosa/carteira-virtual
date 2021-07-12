import { inject, injectable } from "tsyringe";

import { ICreateWalletDTO } from "../../dtos/ICreateWalletDTO";
import { IWalletRepository } from "../../repositories/IWalletRepository";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../user/repositories/IUserRepository";

interface IRequest {
  user_id: string;
}

@injectable()
class GetBalanceUseCase {
  constructor(
    @inject("WalletRepository")
    private walletRepository: IWalletRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({ user_id }: IRequest): Promise<object> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const balance = await this.walletRepository.getBalance(user_id);

    return balance;
  }
}

export { GetBalanceUseCase };
