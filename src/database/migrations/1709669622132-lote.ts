import { MigrationInterface, QueryRunner } from "typeorm";

export class Lote1709669622132 implements MigrationInterface {
    name = 'Lote1709669622132'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "lote" ("numlote" int NOT NULL, "createdat" datetime2 NOT NULL CONSTRAINT "DF_a3889a67372752955684dedb002" DEFAULT getdate(), "updatedat" datetime2 NOT NULL CONSTRAINT "DF_024d000e71c2c81b00f0b5c0311" DEFAULT getdate(), CONSTRAINT "PK_a07260918bb21ace284539a2d3b" PRIMARY KEY ("numlote"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "lote"`);
    }

}
