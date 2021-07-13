import { inject, injectable } from "tsyringe";

import { ICreateTransactionDTO } from "../../dtos/ICreateTransactionDTO";
import { ITransactionsRepository } from "../../repositories/ITransactionsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";
import { ICategoriesRepository } from "../../../categories/repositories/ICategoriesRepository";
import { ITransactionLogsRepository } from "../../repositories/ITransactionLogsRepository";

@injectable()
class CreateTransactionUseCase {
  constructor(
    @inject("TransactionsRepository")
    private transactionsRepository: ITransactionsRepository,
    @inject("UserRepository")
    private usersRepository: IUsersRepository,
    @inject("CategoriesRepository")
    private categoriesRepository: ICategoriesRepository,
    @inject("TransactionLogsRepository")
    private transactionLogsRepository: ITransactionLogsRepository,
  ) {}

  async execute({
    user_id,
    operation,
    value,
    description,
    category_id,
  }: ICreateTransactionDTO): Promise<void> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    if (category_id) {
      const categoryExists = await this.categoriesRepository.findById(
        category_id,
      );

      if (!categoryExists) {
        throw new AppError("Category not found!");
      }
    }

    await this.transactionsRepository.create({
      user_id,
      operation,
      value,
      description,
      category_id,
    });

    // log
    const date = new Date();
    const log = `${
      operation === "I" ? "Depositou" : "Retirou"
    } ${value} em ${date.toLocaleDateString("pt-br")}`;

    await this.transactionLogsRepository.create({
      user_id,
      date,
      operation,
      value,
      log,
    });
  }
}

export { CreateTransactionUseCase };
