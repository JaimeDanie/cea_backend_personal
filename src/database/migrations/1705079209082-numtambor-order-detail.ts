import { MigrationInterface, QueryRunner } from "typeorm";

export class NumtamborOrderDetail1705079209082 implements MigrationInterface {
    name = 'NumtamborOrderDetail1705079209082'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD "numtambor" int`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP COLUMN "numtambor"`);
    }

}
