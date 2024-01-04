import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderSelects1704314975367 implements MigrationInterface {
    name = 'OrderSelects1704314975367'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "non-conformity" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_2528d3d540d0c2a83560ce94eb1" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_2528d3d540d0c2a83560ce94eb1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "filling-camera" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_6feb128eaaee1a9d93ad36b6ea4" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_6feb128eaaee1a9d93ad36b6ea4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tubular" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_53352322b5516a9aceee7d6986e" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_53352322b5516a9aceee7d6986e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "tubular"`);
        await queryRunner.query(`DROP TABLE "filling-camera"`);
        await queryRunner.query(`DROP TABLE "non-conformity"`);
    }

}
