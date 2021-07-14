import { inject, injectable } from "tsyringe";

import { ICreateCategoryDTO } from "../../dtos/ICreateCategoryDTO";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";
import { Category } from "modules/categories/entities/Category";
import { categoriesRoutes } from "routes/categories.routes";

@injectable()
class UpdateCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private CategoriesRepository: ICategoriesRepository,
  ) {}

  async execute({ id, name }: ICreateCategoryDTO): Promise<void> {
    const CategoryExists = await this.CategoriesRepository.findById(id);

    if (!CategoryExists) {
      throw new AppError("Category not found!");
    }

    await this.CategoriesRepository.update({ id, name });
  }
}

export { UpdateCategoryUseCase };
