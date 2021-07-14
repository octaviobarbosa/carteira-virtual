import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddPaymentIdInTransaction1626229437091
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "payment_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FKPayment",
        columnNames: ["payment_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "payments",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("transactions", "FKPayment");

    await queryRunner.dropColumn("transactions", "payment_id");
  }
}
