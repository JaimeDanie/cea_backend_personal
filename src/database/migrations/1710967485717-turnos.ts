import { MigrationInterface, QueryRunner } from "typeorm";

export class Turnos1710967485717 implements MigrationInterface {
    name = 'Turnos1710967485717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "turno" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_0de9cfaa37f128f7e18e73d4074" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, "createdat" datetime2 NOT NULL CONSTRAINT "DF_15aebcdfd3b6d3835fbbe29cfbc" DEFAULT getdate(), "updatedat" datetime2 NOT NULL CONSTRAINT "DF_cc5f351b5abdbee5d6adf5fba29" DEFAULT getdate(), CONSTRAINT "PK_0de9cfaa37f128f7e18e73d4074" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "turno"`);
    }

}
