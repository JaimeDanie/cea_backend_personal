import { MigrationInterface, QueryRunner } from "typeorm";

export class RelationFillerToTubullarOneToOne1704323301181 implements MigrationInterface {
    name = 'RelationFillerToTubullarOneToOne1704323301181'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_d4dbda8f349b12af86c63fc594" ON "filler" ("tubullarId") WHERE "tubullarId" IS NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_d4dbda8f349b12af86c63fc594" ON "filler"`);
    }

}
