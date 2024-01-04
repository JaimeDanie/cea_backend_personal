import { MigrationInterface, QueryRunner } from "typeorm";

export class StatusToFilligCamera1704317621909 implements MigrationInterface {
    name = 'StatusToFilligCamera1704317621909'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filling-camera" ADD "status" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filling-camera" DROP COLUMN "status"`);
    }

}
