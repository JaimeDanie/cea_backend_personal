import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderConfig1706205752867 implements MigrationInterface {
    name = 'OrderConfig1706205752867'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orderdconfig" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_e5315a8ef9a360b362dd640bc78" DEFAULT NEWSEQUENTIALID(), "loteInitial" nvarchar(255), "createdat" datetime2 NOT NULL CONSTRAINT "DF_f4bdef54826bed242e64066efe0" DEFAULT getdate(), CONSTRAINT "PK_e5315a8ef9a360b362dd640bc78" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orderdconfig"`);
    }

}
