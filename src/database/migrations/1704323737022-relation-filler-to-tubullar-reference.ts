import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationFillerToTubullarReference1704323737022 implements MigrationInterface {
    name = 'RelationFillerToTubullarReference1704323737022'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP CONSTRAINT "FK_d4dbda8f349b12af86c63fc5942"`);
        await queryRunner.query(`DROP INDEX "REL_d4dbda8f349b12af86c63fc594" ON "filler"`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.filler.tubullarId", "tubullar"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_0d55207b6fb3928b549c5651d9" ON "filler" ("tubullar") WHERE "tubullar" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "filler" ADD CONSTRAINT "FK_0d55207b6fb3928b549c5651d9a" FOREIGN KEY ("tubullar") REFERENCES "tubular"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP CONSTRAINT "FK_0d55207b6fb3928b549c5651d9a"`);
        await queryRunner.query(`DROP INDEX "REL_0d55207b6fb3928b549c5651d9" ON "filler"`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.filler.tubullar", "tubullarId"`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_d4dbda8f349b12af86c63fc594" ON "filler" ("tubullarId") WHERE ([tubullarId] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "filler" ADD CONSTRAINT "FK_d4dbda8f349b12af86c63fc5942" FOREIGN KEY ("tubullarId") REFERENCES "tubular"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
