import { MigrationInterface, QueryRunner } from "typeorm";

export class NorelationTubularFiller1705530030422 implements MigrationInterface {
    name = 'NorelationTubularFiller1705530030422'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" DROP CONSTRAINT "FK_0d55207b6fb3928b549c5651d9a"`);
        await queryRunner.query(`DROP INDEX "REL_0d55207b6fb3928b549c5651d9" ON "filler"`);
        await queryRunner.query(`ALTER TABLE "filler" DROP COLUMN "tubullar"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "filler" ADD "tubullar" uniqueidentifier`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_0d55207b6fb3928b549c5651d9" ON "filler" ("tubullar") WHERE ([tubullar] IS NOT NULL)`);
        await queryRunner.query(`ALTER TABLE "filler" ADD CONSTRAINT "FK_0d55207b6fb3928b549c5651d9a" FOREIGN KEY ("tubullar") REFERENCES "tubular"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
