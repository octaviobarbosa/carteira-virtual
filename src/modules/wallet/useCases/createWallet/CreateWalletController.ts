import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateWalletUseCase } from "./CreateWalletUseCase";

class CreateWalletController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, operation, value, description, category_id } =
      request.body;
    const createWalletUseCase = container.resolve(CreateWalletUseCase);

    await createWalletUseCase.execute({
      user_id,
      operation,
      value,
      description,
      category_id,
    });

    return response.status(201).send();
  }
}

export { CreateWalletController };
