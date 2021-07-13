import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AlterTransactionValueType1626133724404
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transactions", "value");

    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "value",
        type: "decimal",
        precision: 10,
        scale: 2,
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("transactions", "value");

    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "value",
        type: "numeric",
      }),
    );
  }
}
