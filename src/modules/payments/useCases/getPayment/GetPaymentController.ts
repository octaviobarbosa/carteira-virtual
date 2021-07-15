import { Request, Response } from "express";
import { container } from "tsyringe";
import { GetPaymentUseCase } from "./GetPaymentUseCase";

class GetPaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { id: user_id } = request.user;
    const getPaymentUseCase = container.resolve(GetPaymentUseCase);

    const payment = await getPaymentUseCase.execute(user_id, id);

    return response.status(200).json(payment);
  }
}

export { GetPaymentController };
