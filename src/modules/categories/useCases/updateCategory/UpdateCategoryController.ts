import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

class UpdateCategoryController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const { id } = request.params;

    const updateCategoryUseCaseUseCase = container.resolve(
      UpdateCategoryUseCase,
    );

    const categories = await updateCategoryUseCaseUseCase.execute({ id, name });

    return response.status(200).send();
  }
}

export { UpdateCategoryController };
