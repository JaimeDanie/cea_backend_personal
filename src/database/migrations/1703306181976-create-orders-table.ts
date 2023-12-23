import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateOrdersTable1703306181976 implements MigrationInterface {
    name = 'CreateOrdersTable1703306181976'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "orders" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_710e2d4957aa5878dfe94e4ac2f" DEFAULT NEWSEQUENTIALID(), "sapOrderNumber" nvarchar(255) NOT NULL, "productName" nvarchar(255) NOT NULL, "filler" nvarchar(255) NOT NULL, "operator" nvarchar(255) NOT NULL, "created_at" datetime2 NOT NULL CONSTRAINT "DF_c884e321f927d5b86aac7c8f9ef" DEFAULT getdate(), "updated_at" datetime2 NOT NULL CONSTRAINT "DF_44eaa1eacc7a091d5d3e2a6c828" DEFAULT getdate(), CONSTRAINT "PK_710e2d4957aa5878dfe94e4ac2f" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "orders"`);
    }

}
