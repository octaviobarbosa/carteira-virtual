import { inject, injectable } from "tsyringe";

import { ICategoriesRepository } from "../../repositories/ICategoriesRepository";
import { AppError } from "../../../../errors/AppError";

@injectable()
class DeleteCategoryUseCase {
  constructor(
    @inject("CategoriesRepository")
    private CategoriesRepository: ICategoriesRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const CategoryExists = await this.CategoriesRepository.findById(id);

    if (!CategoryExists) {
      throw new AppError("Category not found!");
    }

    await this.CategoriesRepository.delete(id);
  }
}

export { DeleteCategoryUseCase };
