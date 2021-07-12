import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class CreateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private CategoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ name }: ICreateCategoryDTO): Promise<void> {
    const CategoryAlreadyExists = await this.CategoriesRepository.findByName(
      name,
    );

    if (CategoryAlreadyExists) {
      throw new AppError("Category already exists!");
    }

    await this.CategoriesRepository.create({
      name,
    });
  }
}

export { CreateCategoryUseCase };
