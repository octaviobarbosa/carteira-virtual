import { Request, Response } from "express";
import { container } from "tsyringe";
import { PayPaymentUseCase } from "./PayPaymentUseCase";

class PayPaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { payment_id, payment_date } = request.body;
    const { id } = request.user;
    const payPaymentUseCase = container.resolve(PayPaymentUseCase);

    await payPaymentUseCase.execute({
      user_id: id,
      payment_id,
      payment_date,
    });

    return response.status(200).send();
  }
}

export { PayPaymentController };
