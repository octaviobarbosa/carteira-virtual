interface ICreateTransactionDTO {
  id?: string;
  user_id: string;
  operation: string;
  description: string;
  value: number;
  category_id?: string;
  to_user_id?: string;
  from_user_id?: string;
  payment_id?: string;
}

export { ICreateTransactionDTO };
