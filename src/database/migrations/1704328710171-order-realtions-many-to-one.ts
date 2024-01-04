import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderRealtionsManyToOne1704328710171 implements MigrationInterface {
    name = 'OrderRealtionsManyToOne1704328710171'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "REL_b78bba33cd27a8f09b83bf5aea" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_9814f9a81516017a2cce017f5f" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_305758d39e07bdf3b911b6068d" ON "orders"`);
        await queryRunner.query(`DROP INDEX "REL_e611face1a103d7587390890f8" ON "orders"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_e611face1a103d7587390890f8" ON "orders" ("tubular") WHERE ([tubular] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_305758d39e07bdf3b911b6068d" ON "orders" ("operate") WHERE ([operate] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_9814f9a81516017a2cce017f5f" ON "orders" ("filler") WHERE ([filler] IS NOT NULL)`);
        await queryRunner.query(`CREATE UNIQUE INDEX "REL_b78bba33cd27a8f09b83bf5aea" ON "orders" ("product") WHERE ([product] IS NOT NULL)`);
    }

}
