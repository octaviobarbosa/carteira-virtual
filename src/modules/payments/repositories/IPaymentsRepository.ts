import { ICreatePaymentDTO } from "../dtos/ICreatePaymentDTO";
import { Payment } from "../entities/Payment";

interface IPaymentsRepository {
  create(data: ICreatePaymentDTO): Promise<void>;
  update(data: ICreatePaymentDTO): Promise<void>;
  delete(id: string): Promise<void>;
  pay(payment_id: string, payment_date: Date): Promise<void>;
  reverse(payment_id: string): Promise<void>;
  findById(id: string): Promise<Payment>;
  findByUserId(user_id: string): Promise<Payment[]>;
}

export { IPaymentsRepository };
