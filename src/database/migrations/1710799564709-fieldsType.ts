import { MigrationInterface, QueryRunner } from "typeorm";

export class FieldsType1710799564709 implements MigrationInterface {
    name = 'FieldsType1710799564709'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" ADD "supervisor" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "sello"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "sello" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_30f70e155e00f7a977b03a95d5c" FOREIGN KEY ("supervisor") REFERENCES "operate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_30f70e155e00f7a977b03a95d5c"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "sello"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "sello" int`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "supervisor"`);
    }

}
