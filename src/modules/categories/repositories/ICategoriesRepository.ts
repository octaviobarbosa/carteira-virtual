import { ICreateCategoryDTO } from "../dtos/ICreateCategoryDTO";
import { Category } from "../entities/Category";

interface ICategoriesRepository {
  create(data: ICreateCategoryDTO): Promise<void>;
  list(): Promise<Category[]>;
  update(data: ICreateCategoryDTO): Promise<void>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<Category>;
  findByName(name: string): Promise<Category>;
}

export { ICategoriesRepository };
