import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";
import { Category } from "modules/categories/entities/Category";

@injectable()
class GetCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private CategoriesRepository: ICategoriesRepository,
  ) {}

  async execute(id: string): Promise<Category> {
    const CategoryExists = await this.CategoriesRepository.findById(id);

    if (!CategoryExists) {
      throw new AppError("Category not found!");
    }

    return CategoryExists;
  }
}

export { GetCategoryUseCase };
