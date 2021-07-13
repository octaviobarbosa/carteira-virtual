import { getRepository, Repository } from "typeorm";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";

import { Transaction } from "../entities/Transaction";
import { ITransactionsRepository } from "./ITransactionsRepository";

class TransactionsRepository implements ITransactionsRepository {
  private repository: Repository<Transaction>;

  constructor() {
    this.repository = getRepository(Transaction);
  }

  async create({
    user_id,
    operation,
    value,
    description,
    category_id,
  }: ICreateTransactionDTO): Promise<void> {
    const Transaction = this.repository.create({
      user_id,
      operation,
      value,
      description,
      category_id,
    });

    await this.repository.save(Transaction);
  }

  async findByUserId(user_id: string): Promise<Transaction[]> {
    const Transaction = await this.repository.find({
      where: {
        user_id,
      },
    });
    return Transaction;
  }

  async getBalance(user_id: string): Promise<object> {
    const { income } = await this.repository
      .createQueryBuilder("wallet")
      .select("SUM(wallet.value)", "income")
      .where("user_id = :id", { id: user_id })
      .andWhere("operation = 'I'")
      .getRawOne();

    const { outcome } = await this.repository
      .createQueryBuilder("wallet")
      .select("SUM(wallet.value)", "outcome")
      .where("user_id = :id", { id: user_id })
      .andWhere("operation = 'O'")
      .getRawOne();

    const balance = {
      income: income ? Number(income) : 0,
      outcome: outcome ? Number(outcome) : 0,
      balance: income - outcome,
    };
    return balance;
  }
}

export { TransactionsRepository };
