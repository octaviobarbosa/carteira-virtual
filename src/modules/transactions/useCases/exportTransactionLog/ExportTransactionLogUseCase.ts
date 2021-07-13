import { inject, injectable } from "tsyringe";
import fs from "fs";
import json2csv from "json-2-csv";

import { ITransactionLogsRepository } from "../../repositories/ITransactionLogsRepository";
import { AppError } from "../../../../errors/AppError";
import { IUsersRepository } from "../../../users/repositories/IUsersRepository";

interface IRequest {
  user_id?: string;
  start?: Date;
  end?: Date;
}

@injectable()
class ExportTransactionLogUseCase {
  constructor(
    @inject("TransactionLogsRepository")
    private transactionLogsRepository: ITransactionLogsRepository,
    @inject("UserRepository")
    private usersRepository: IUsersRepository,
  ) {}

  async execute({ user_id, start, end }: IRequest): Promise<string> {
    const userExists = await this.usersRepository.findById(user_id);

    if (!userExists) {
      throw new AppError("User not found!");
    }

    const logs = await this.transactionLogsRepository.findByUserId(
      user_id,
      start,
      end,
    );

    const path = `./src/tmp/${user_id}_${Date.now()}.csv`;

    try {
      const csv = await json2csv.json2csvAsync(logs);

      fs.writeFileSync(path, csv);
    } catch (err) {
      console.log(err);
    }

    if (fs.existsSync(path)) return path;
  }
}

export { ExportTransactionLogUseCase };
