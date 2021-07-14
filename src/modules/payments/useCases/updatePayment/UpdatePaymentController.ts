import { Request, Response } from "express";
import { container } from "tsyringe";
import { UpdatePaymentUseCase } from "./UpdatePaymentUseCase";

class UpdatePaymentController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      type,
      value,
      description,
      due_date,
      payment_date,
      is_automatic_debt,
      repeat,
    } = request.body;
    const { id: payment_id } = request.params;
    const { id } = request.user;
    const updatePaymentUseCase = container.resolve(UpdatePaymentUseCase);

    await updatePaymentUseCase.execute({
      id: payment_id,
      user_id: id,
      type,
      value,
      description,
      due_date,
      payment_date,
      is_automatic_debt,
      repeat,
    });

    return response.status(200).send();
  }
}

export { UpdatePaymentController };
