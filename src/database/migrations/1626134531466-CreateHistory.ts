import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateHistory1626134531466 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "transaction_logs",
        columns: [
          {
            name: "id",
            type: "uuid",
            isGenerated: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "date",
            type: "date",
          },
          {
            name: "operation",
            type: "char",
          },
          {
            name: "value",
            type: "decimal",
            precision: 10,
            scale: 2,
            isNullable: false,
          },
          {
            name: "log",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("trasaction_logs");
  }
}
