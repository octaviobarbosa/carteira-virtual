import { getRepository, IsNull, Not, Repository } from "typeorm";
import { ICreatePaymentDTO } from "../dtos/ICreatePaymentDTO";

import { Payment } from "../entities/Payment";
import { IPaymentsRepository } from "./IPaymentsRepository";

class PaymentsRepository implements IPaymentsRepository {
  private repository: Repository<Payment>;

  constructor() {
    this.repository = getRepository(Payment);
  }

  async create({
    user_id,
    type,
    value,
    description,
    due_date,
    payment_date,
    is_automatic_debt,
  }: ICreatePaymentDTO): Promise<void> {
    const Payment = this.repository.create({
      user_id,
      type,
      value,
      description,
      due_date,
      payment_date,
      is_automatic_debt,
    });

    await this.repository.save(Payment);
  }

  async update(data: ICreatePaymentDTO): Promise<void> {
    await this.repository.update(data.id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ id });
  }

  async pay(payment_id: string, payment_date: Date): Promise<void> {
    await this.repository.update(payment_id, { payment_date });
  }
  async reverse(payment_id: string): Promise<void> {
    await this.repository.update(payment_id, { payment_date: null });
  }

  async findById(id: string): Promise<Payment> {
    const Payment = await this.repository.findOne(id);
    return Payment;
  }

  async findByUserId(user_id: string): Promise<Payment[]> {
    const Payment = await this.repository.find({
      where: {
        user_id,
      },
    });
    return Payment;
  }
}

export { PaymentsRepository };
