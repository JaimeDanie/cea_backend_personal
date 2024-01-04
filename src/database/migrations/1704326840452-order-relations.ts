import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRelations1704326840452 implements MigrationInterface {
    name = 'OrderRelations1704326840452'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "productName"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "operator"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "product" nvarchar(255)`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "operate" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "tubular" uniqueidentifier`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "filler"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "filler" uniqueidentifier`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b78bba33cd27a8f09b83bf5aea" ON "orders" ("product") WHERE "product" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_9814f9a81516017a2cce017f5f" ON "orders" ("filler") WHERE "filler" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_305758d39e07bdf3b911b6068d" ON "orders" ("operate") WHERE "operate" IS NOT NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_e611face1a103d7587390890f8" ON "orders" ("tubular") WHERE "tubular" IS NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_b78bba33cd27a8f09b83bf5aea7" FOREIGN KEY ("product") REFERENCES "productos"("code") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_9814f9a81516017a2cce017f5fe" FOREIGN KEY ("filler") REFERENCES "filler"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_305758d39e07bdf3b911b6068d9" FOREIGN KEY ("operate") REFERENCES "operate"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orders" ADD CONSTRAINT "FK_e611face1a103d7587390890f8e" FOREIGN KEY ("tubular") REFERENCES "tubular"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_e611face1a103d7587390890f8e"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_305758d39e07bdf3b911b6068d9"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_9814f9a81516017a2cce017f5fe"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP CONSTRAINT "FK_b78bba33cd27a8f09b83bf5aea7"`);
        await queryRunner.query(`DROP INDEX "REL_e611face1a103d7587390890f8" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_305758d39e07bdf3b911b6068d" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_9814f9a81516017a2cce017f5f" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_b78bba33cd27a8f09b83bf5aea" ON "orders"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "filler"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "filler" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "tubular"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "operate"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "product"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "operator" nvarchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "productName" nvarchar(255) NOT NULL`);
    }

}
