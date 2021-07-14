import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";

class DeleteCategoryController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const deleteCategoryUseCaseUseCase = container.resolve(
      DeleteCategoryUseCase,
    );

    await deleteCategoryUseCaseUseCase.execute(id);

    return response.status(204).send();
  }
}

export { DeleteCategoryController };
