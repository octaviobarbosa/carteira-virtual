import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetCategoryUseCase } from "./GetCategoryUseCase";

class GetCategoryController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const getCategoryUseCase = container.resolve(GetCategoryUseCase);

    const category = await getCategoryUseCase.execute(id);

    return response.status(200).json(category);
  }
}

export { GetCategoryController };
