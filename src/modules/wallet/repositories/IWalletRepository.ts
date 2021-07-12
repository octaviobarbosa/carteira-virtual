import { ICreateWalletDTO } from "../dtos/ICreateWalletDTO";
import { Wallet } from "../entities/Wallet";

interface IWalletRepository {
  create(data: ICreateWalletDTO): Promise<void>;
  findByUserId(user_id: string): Promise<Wallet[]>;
  getBalance(user_id: string): Promise<object>;
}

export { IWalletRepository };
