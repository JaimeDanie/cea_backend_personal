import { MigrationInterface, QueryRunner } from "typeorm";

export class Filler1704228721281 implements MigrationInterface {
    name = 'Filler1704228721281'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "filler" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_9853d92975791b2161c09774a72" DEFAULT NEWSEQUENTIALID(), "filler" int NOT NULL, "tubullar" int NOT NULL, CONSTRAINT "PK_9853d92975791b2161c09774a72" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "filler"`);
    }

}
