import { getRepository, IsNull, Not, Repository } from "typeorm";
import { ICreateTransactionDTO } from "../dtos/ICreateTransactionDTO";

import { Transaction } from "../entities/Transaction";
import { ITransactionsRepository } from "./ITransactionsRepository";

// interface Balance {
//   income: number;
//   outcome: number;
//   balance: number;
// }

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
    to_user_id,
    from_user_id,
  }: ICreateTransactionDTO): Promise<void> {
    const Transaction = this.repository.create({
      user_id,
      operation,
      value,
      description,
      category_id,
      to_user_id,
      from_user_id,
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

  async getBalance(user_id: string): Promise<any> {
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

  async getFriendsTransactions(user_id: string): Promise<Transaction[]> {
    const Transaction = await this.repository.find({
      where: [
        {
          user_id,
          to_user_id: Not(IsNull()),
        },
        {
          user_id,
          from_user_id: Not(IsNull()),
        },
      ],
      relations: ["user", "to_user", "from_user"],
    });
    return Transaction;
  }
}

export { TransactionsRepository };
