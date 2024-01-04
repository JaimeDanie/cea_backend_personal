import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationFillerToTubullar1704320368141 implements MigrationInterface {
    name = 'RelationFillerToTubullar1704320368141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.filler.tubullar", "tubullarId"`);
        await queryRunner.query(`ALTER TABLE "filler" DROP COLUMN "tubullarId"`);
        await queryRunner.query(`ALTER TABLE "filler" ADD "tubullarId" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "filler" ADD CONSTRAINT "FK_d4dbda8f349b12af86c63fc5942" FOREIGN KEY ("tubullarId") REFERENCES "tubular"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP CONSTRAINT "FK_d4dbda8f349b12af86c63fc5942"`);
        await queryRunner.query(`ALTER TABLE "filler" DROP COLUMN "tubullarId"`);
        await queryRunner.query(`ALTER TABLE "filler" ADD "tubullarId" int NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.filler.tubullarId", "tubullar"`);
    }

}
