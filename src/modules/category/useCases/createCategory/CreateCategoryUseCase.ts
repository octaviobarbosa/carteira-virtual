import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategoryRepository } from "../../repositories/ICategoryRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoryRepository")
    private CategorysRepository: ICategoryRepository,
  ) {}

  async execute({ name }: ICreateCategoryDTO): Promise<void> {
    const CategoryAlreadyExists = await this.CategorysRepository.findByName(
      name,
    );

    if (CategoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.CategorysRepository.create({
      name,
    });
  }
}

export { CreateCategoryUseCase };
