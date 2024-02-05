import { MigrationInterface, QueryRunner } from "typeorm";

export class DeleteFieldsToOrderDetail1707167019629 implements MigrationInterface {
    name = 'DeleteFieldsToOrderDetail1707167019629'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "status_tambor"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "novedad_tambor"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "novedad_tambor" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "status_tambor" nvarchar(255) NOT NULL`);
    }

}
