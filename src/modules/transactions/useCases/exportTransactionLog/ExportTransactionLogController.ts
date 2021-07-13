import { Request, Response } from "express";
import fs from "fs";
import { container } from "tsyringe";
import { ExportTransactionLogUseCase } from "./ExportTransactionLogUseCase";

class ExportTransactionLogController {
  constructor() {}

  async handle(request: Request, response: Response): Promise<void> {
    const { start, end } = request.query;
    const { id } = request.user;
    const exportTransactionLogUseCase = container.resolve(
      ExportTransactionLogUseCase,
    );

    const path = await exportTransactionLogUseCase.execute({
      user_id: id,
      start: new Date(start as string),
      end: new Date(end as string),
    });

    return response.status(200).download(path, () => {
      fs.unlinkSync(path);
    });
  }
}

export { ExportTransactionLogController };
