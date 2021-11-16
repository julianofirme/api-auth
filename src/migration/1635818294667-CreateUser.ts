import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUser1635818294667 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            generationStrategy: "uuid",
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "varchar(200)",
          },
          {
            name: "name",
            type: "varchar(200)",
          },
          {
            name: "salt",
            type: "text",
          },
          {
            name: "hash",
            type: "text",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
