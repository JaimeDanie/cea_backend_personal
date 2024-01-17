import { MigrationInterface, QueryRunner } from "typeorm";

export class Numordertoordernullable1705072041832 implements MigrationInterface {
    name = 'Numordertoordernullable1705072041832'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "numorder" int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "numorder"`);
    }

}
