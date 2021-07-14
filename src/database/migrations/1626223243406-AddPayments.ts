import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class AddPayments1626223243406 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "payments",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "user_id",
            type: "uuid",
          },
          {
            name: "type",
            type: "char",
          },
          {
            name: "description",
            type: "varchar",
          },
          {
            name: "value",
            type: "decimal",
            precision: 10,
            scale: 2,
          },
          {
            name: "due_date",
            type: "date",
          },
          {
            name: "payment_date",
            type: "date",
            isNullable: true,
          },
          {
            name: "is_automatic_debt",
            type: "bool",
            default: false,
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
    await queryRunner.dropTable("payments");
  }
}
