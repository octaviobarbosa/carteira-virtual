import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from "typeorm";

export class AddCategoryInWallet1626126715333 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "wallet",
      new TableColumn({
        name: "category_id",
        type: "uuid",
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      "wallet",
      new TableForeignKey({
        name: "FKCategory",
        columnNames: ["category_id"],
        referencedColumnNames: ["id"],
        referencedTableName: "category",
        onDelete: "SET NULL",
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("wallet", "category_id");
    await queryRunner.dropForeignKey("wallet", "FKCategory");
  }
}
