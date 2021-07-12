import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";

import { Category } from "../entities/Category";
import { ICategoriesRepository } from "./ICategoriesRepository";

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = getRepository(Category);
  }

  async create({ name, id }: ICreateCategoryDTO): Promise<void> {
    const category = this.repository.create({
      name,
      id,
    });

    await this.repository.save(category);
  }

  async findById(id: string): Promise<Category> {
    const category = await this.repository.findOne(id);
    return category;
  }

  async findByName(name: string): Promise<Category> {
    const category = await this.repository.findOne({ where: { name } });
    return category;
  }
}

export { CategoriesRepository };
