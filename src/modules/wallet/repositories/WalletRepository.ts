import { getRepository, Repository } from "typeorm";
import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO";

import { Wallet } from "../entities/Wallet";
import { IWalletRepository } from "./IWalletRepository";

class WalletRepository implements IWalletRepository {
  private repository: Repository<Wallet>;

  constructor() {
    this.repository = getRepository(Wallet);
  }

  async create({
    user_id,
    operation,
    value,
    description,
    category_id,
  }: ICreateWalletDTO): Promise<void> {
    const wallet = this.repository.create({
      user_id,
      operation,
      value,
      description,
      category_id,
    });

    await this.repository.save(wallet);
  }

  async findByUserId(user_id: string): Promise<Wallet[]> {
    const wallet = await this.repository.find({
      where: {
        user_id,
      },
    });
    return wallet;
  }

  async getBalance(user_id: string): Promise<object> {
    const { income } = await this.repository
      .createQueryBuilder("wallet")
      .select("SUM(wallet.value)", "income")
      .where("user_id = :id", { user_id })
      .where("operation = 'I'")
      .getRawOne();

    const { outcome } = await this.repository
      .createQueryBuilder("wallet")
      .select("SUM(wallet.value)", "outcome")
      .where("user_id = :id", { user_id })
      .where("operation = 'O'")
      .getRawOne();

    const balance = {
      income: income ? Number(income) : 0,
      outcome: outcome ? Number(outcome) : 0,
      balance: income - outcome,
    };
    return balance;
  }
}

export { WalletRepository };
