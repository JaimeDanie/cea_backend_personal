import { MigrationInterface, QueryRunner } from "typeorm";

export class Product1704224804148 implements MigrationInterface {
    name = 'Product1704224804148'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "productos" ("code" nvarchar(255) NOT NULL, "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_0a0a4954cb4f502bcde51bd500c" PRIMARY KEY ("code"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "productos"`);
    }

}
