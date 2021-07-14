import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListPaymentsUseCase } from "./ListPaymentsUseCase";

class ListPaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const listPaymentsUseCase = container.resolve(ListPaymentsUseCase);

    const payment = await listPaymentsUseCase.execute({
      user_id: id,
    });

    return response.status(200).json(payment);
  }
}

export { ListPaymentController };
