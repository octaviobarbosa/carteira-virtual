import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTransactionUseCase } from "./CreateTransactionUseCase";

class CreateTransactionController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { operation, value, description, category_id } = request.body;
    const { id } = request.user;
    const createTransactionUseCase = container.resolve(
      CreateTransactionUseCase,
    );

    await createTransactionUseCase.execute({
      user_id: id,
      operation,
      value,
      description,
      category_id,
    });

    return response.status(201).send();
  }
}

export { CreateTransactionController };
