import { Between, getRepository, Repository } from "typeorm";
import { ICreateTransactionLogDTO } from "../dtos/ICreateTransactionLogDTO";

import { TransactionLog } from "../entities/TransactionLog";
import { ITransactionLogsRepository } from "./ITransactionLogsRepository";

class TransactionLogsRepository implements ITransactionLogsRepository {
  private repository: Repository<TransactionLog>;

  constructor() {
    this.repository = getRepository(TransactionLog);
  }

  async create({
    user_id,
    date,
    operation,
    value,
    log,
  }: ICreateTransactionLogDTO): Promise<void> {
    const Transaction = this.repository.create({
      user_id,
      date,
      operation,
      value,
      log,
    });

    await this.repository.save(Transaction);
  }

  async findByUserId(
    user_id: string,
    start: Date,
    end: Date,
  ): Promise<TransactionLog[]> {
    const logs = await this.repository.find({
      where: {
        user_id,
        date: Between(start, end),
      },
    });
    return logs;
  }
}

export { TransactionLogsRepository };
