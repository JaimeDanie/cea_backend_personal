import { MigrationInterface, QueryRunner } from "typeorm";

export class AddcoderequestchangePassword1704215029528 implements MigrationInterface {
    name = 'AddcoderequestchangePassword1704215029528'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "recoveryHashPassword" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "recoveryHashPassword"`);
    }

}
