import { MigrationInterface, QueryRunner } from "typeorm";

export class OrderConfigField1706207367586 implements MigrationInterface {
    name = 'OrderConfigField1706207367586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orderdconfig.loteInitial", "loteinitial"`);
        await queryRunner.query(`ALTER TABLE "orderdconfig" DROP COLUMN "loteinitial"`);
        await queryRunner.query(`ALTER TABLE "orderdconfig" ADD "loteinitial" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdconfig" DROP COLUMN "loteinitial"`);
        await queryRunner.query(`ALTER TABLE "orderdconfig" ADD "loteinitial" nvarchar(255)`);
        await queryRunner.query(`EXEC sp_rename "cea_muto.dbo.orderdconfig.loteinitial", "loteInitial"`);
    }

}
