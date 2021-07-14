import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreatePaymentUseCase } from "./CreatePaymentUseCase";

class CreatePaymentController {
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
    const { id } = request.user;
    const createPaymentUseCase = container.resolve(CreatePaymentUseCase);

    await createPaymentUseCase.execute({
      user_id: id,
      type,
      value,
      description,
      due_date,
      payment_date,
      is_automatic_debt,
      repeat,
    });

    return response.status(201).send();
  }
}

export { CreatePaymentController };
