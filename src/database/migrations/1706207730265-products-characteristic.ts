import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductsCharacteristic1706207730265 implements MigrationInterface {
    name = 'ProductsCharacteristic1706207730265'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" ADD "characteristiclote" nvarchar(255)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "productos" DROP COLUMN "characteristiclote"`);
    }

}
