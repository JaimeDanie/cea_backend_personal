import { MigrationInterface, QueryRunner } from "typeorm";

export class FillerTypeName1710801962462 implements MigrationInterface {
    name = 'FillerTypeName1710801962462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP COLUMN "filler"`);
        await queryRunner.query(`ALTER TABLE "filler" ADD "filler" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP COLUMN "filler"`);
        await queryRunner.query(`ALTER TABLE "filler" ADD "filler" int NOT NULL`);
    }

}
