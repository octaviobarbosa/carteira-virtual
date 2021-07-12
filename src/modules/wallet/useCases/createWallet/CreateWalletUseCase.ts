import { inject, injectable } from "tsyringe";

import { ICreateWalletDTO } from "../../dtos/ICreateWalletDTO";
import { IWalletRepository } from "../../repositories/IWalletRepository";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../user/repositories/IUserRepository";

@injectable()
class CreateWalletUseCase {
  constructor(
    @inject("WalletRepository")
    private walletRepository: IWalletRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
  ) {}

  async execute({
    user_id,
    operation,
    value,
    description,
  }: ICreateWalletDTO): Promise<void> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    await this.walletRepository.create({
      user_id,
      operation,
      value,
      description,
    });
  }
}

export { CreateWalletUseCase };
