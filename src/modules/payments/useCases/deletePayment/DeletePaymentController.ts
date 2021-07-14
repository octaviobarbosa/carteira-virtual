import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeletePaymentUseCase } from "./DeletePaymentUseCase";

class DeletePaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { id: payment_id } = request.params;
    const { id } = request.user;
    const deletePaymentUseCase = container.resolve(DeletePaymentUseCase);

    await deletePaymentUseCase.execute({
      user_id: id,
      payment_id,
    });

    return response.status(204).send();
  }
}

export { DeletePaymentController };
