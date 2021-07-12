import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";
import { Transaction } from "../entities/Transaction";

interface ITransactionsRepository {
  create(data: ICreateTransactionDTO): Promise<void>;
  findByUserId(user_id: string): Promise<Transaction[]>;
  getBalance(user_id: string): Promise<object>;
}

export { ITransactionsRepository };