import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderSapnumber1704327067049 implements MigrationInterface {
    name = 'OrderSapnumber1704327067049'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orders.sapOrderNumber", "saporder"`);
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "saporder"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "saporder" nvarchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orders" DROP COLUMN "saporder"`);
        await queryRunner.query(`ALTER TABLE "orders" ADD "saporder" nvarchar(255) NOT NULL`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orders.saporder", "sapOrderNumber"`);
    }

}
