interface ICreateTransactionLogDTO {
  id?: string;
  user_id: string;
  date: Date;
  operation: string;
  value: number;
  log: string;
}

export { ICreateTransactionLogDTO };
