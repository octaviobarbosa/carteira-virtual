import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListFriendTransactionsUseCase } from "./ListFriendTransactionsUseCase";

class ListFriendTransactionsController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listFriendTransactionsUseCase = container.resolve(
      ListFriendTransactionsUseCase,
    );

    const transactions = await listFriendTransactionsUseCase.execute(id);

    return response.status(200).json(transactions);
  }
}

export { ListFriendTransactionsController };
