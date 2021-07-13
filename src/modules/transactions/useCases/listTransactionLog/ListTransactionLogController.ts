import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTransactionLogUseCase } from "./ListTransactionLogUseCase";

class ListTransactionLogController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { user_id, start, end } = request.query;
    const listTransactionLogUseCase = container.resolve(
      ListTransactionLogUseCase,
    );

    const logs = await listTransactionLogUseCase.execute({
      user_id: user_id as string,
      start: new Date(start as string),
      end: new Date(end as string),
    });

    return response.status(200).json(logs);
  }
}

export { ListTransactionLogController };
