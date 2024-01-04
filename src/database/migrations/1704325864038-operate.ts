import { MigrationInterface, QueryRunner } from "typeorm";

export class Operate1704325864038 implements MigrationInterface {
    name = 'Operate1704325864038'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "operate" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_fafadc4808a27e88c715f070040" DEFAULT NEWSEQUENTIALID(), "fullname" nvarchar(255) NOT NULL, "type" nvarchar(255) NOT NULL, CONSTRAINT "PK_fafadc4808a27e88c715f070040" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "operate"`);
    }

}
