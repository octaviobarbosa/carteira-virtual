import { inject, injectable } from "tsyringe";

import { ICreateWalletDTO } from "../../dtos/ICreateWalletDTO";
import { IWalletRepository } from "../../repositories/IWalletRepository";
import { AppError } from "../../../../errors/AppError";
import { IUserRepository } from "../../../user/repositories/IUserRepository";
import { ICategoryRepository } from "../../../category/repositories/ICategoryRepository";

@injectable()
class CreateWalletUseCase {
  constructor(
    @inject("WalletRepository")
    private walletRepository: IWalletRepository,
    @inject("UserRepository")
    private userRepository: IUserRepository,
    @inject("CategoryRepository")
    private categoryRepository: ICategoryRepository,
  ) {}

  async execute({
    user_id,
    operation,
    value,
    description,
    category_id,
  }: ICreateWalletDTO): Promise<void> {
    const userExists = await this.userRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    if (category_id) {
      const categoryExists = await this.categoryRepository.findById(
        category_id,
      );

      if (!categoryExists) {
        throw new AppError("Category not found!");
      }
    }

    await this.walletRepository.create({
      user_id,
      operation,
      value,
      description,
      category_id,
    });
  }
}

export { CreateWalletUseCase };
