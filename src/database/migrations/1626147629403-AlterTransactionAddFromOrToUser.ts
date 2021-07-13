import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AlterTransactionAddFromOrToUser1626147629403
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "to_user_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.addColumn(
      "transactions",
      new TableColumn({
        name: "from_user_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FKToUser",
        columnNames: ["to_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
    );

    await queryRunner.createForeignKey(
      "transactions",
      new TableForeignKey({
        name: "FKFromUser",
        columnNames: ["from_user_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "users",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey("transactions", "FKToUser");
    await queryRunner.dropForeignKey("transactions", "FKFromUser");

    await queryRunner.dropColumn("transactions", "to_user_id");
    await queryRunner.dropColumn("transactions", "from_user_id");
  }
}
