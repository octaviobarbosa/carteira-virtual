interface ICreatePaymentDTO {
  id?: string;
  user_id: string;
  type: string;
  description: string;
  value: number;
  due_date: Date;
  payment_date?: Date;
  is_automatic_debt?: boolean;
  repeat?: number;
}

export { ICreatePaymentDTO };
