import { getRepository, Repository } from "typeorm";
import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";

import { Category } from "../entities/Category";
import { ICategoryRepository } from "./ICategoryRepository";

class CategoryRepository implements ICategoryRepository {
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

export { CategoryRepository };
