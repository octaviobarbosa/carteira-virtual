import { Request, Response } from "express";
import { container } from "tsyringe";
import { ReversePaymentUseCase } from "./ReversePaymentUseCase";

class ReversePaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: payment_id } = request.params;
    const { id } = request.user;
    const reversePaymentUseCase = container.resolve(ReversePaymentUseCase);

    await reversePaymentUseCase.execute({
      user_id: id,
      payment_id,
    });

    return response.status(200).send();
  }
}

export { ReversePaymentController };
