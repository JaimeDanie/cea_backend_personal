import { MigrationInterface, QueryRunner } from "typeorm";

export class TypeLoteBolsa1710942896383 implements MigrationInterface {
    name = 'TypeLoteBolsa1710942896383'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "lotebolsa"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "lotebolsa" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "lotebolsa"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "lotebolsa" int`);
    }

}
