import { ICreateTransactionLogDTO } from "../dtos/ICreateTransactionLogDTO";
import { TransactionLog } from "../entities/TransactionLog";

interface ITransactionLogsRepository {
  create(data: ICreateTransactionLogDTO): Promise<void>;
  findByUserId(
    user_id: string,
    start: Date,
    end: Date,
  ): Promise<TransactionLog[]>;
}

export { ITransactionLogsRepository };
