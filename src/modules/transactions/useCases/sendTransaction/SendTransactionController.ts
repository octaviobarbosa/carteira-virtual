import { Request, Response } from "express";
import { container } from "tsyringe";
import { SendTransactionUseCase } from "./SendTransactionUseCase";

class SendTransactionController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { send_user_id, description, value } = request.body;
    const { id } = request.user;
    const sendTransactionUseCase = container.resolve(SendTransactionUseCase);

    await sendTransactionUseCase.execute({
      user_id: id,
      value,
      description,
      send_user_id,
    });

    return response.status(201).send();
  }
}

export { SendTransactionController };
