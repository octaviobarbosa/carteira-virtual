import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTransactionsUseCase } from "./ListTransactionsUseCase";

class ListTransactionsController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listTransactionsUseCase = container.resolve(ListTransactionsUseCase);

    const transactions = await listTransactionsUseCase.execute({
      user_id: id,
    });

    return response.status(200).json(transactions);
  }
}

export { ListTransactionsController };
