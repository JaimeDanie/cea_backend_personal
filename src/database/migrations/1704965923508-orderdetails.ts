import { MigrationInterface, QueryRunner } from "typeorm";

export class Orderdetails1704965923508 implements MigrationInterface {
    name = 'Orderdetails1704965923508'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nonconformity" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_edcd09b9f705f6e3229c73dec67" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_edcd09b9f705f6e3229c73dec67" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "orderdetail" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_5502309b1a989428ac47eb9f6ad" DEFAULT NEWSEQUENTIALID(), "serial" nvarchar(255), "lote" nvarchar(255) NOT NULL, "dateFilling" nvarchar(255) NOT NULL, "duration" nvarchar(255), "sello" int, "lotebolsa" int, "weight" int, "filligcamera" uniqueidentifier, "nonconformity" uniqueidentifier, CONSTRAINT "PK_5502309b1a989428ac47eb9f6ad" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "FK_e39fd6401ce4d77ca49c8cb4f9f" FOREIGN KEY ("filligcamera") REFERENCES "filling-camera"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "orderdetail" ADD CONSTRAINT "FK_1044e52222633f4f7a463693223" FOREIGN KEY ("nonconformity") REFERENCES "nonconformity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "FK_1044e52222633f4f7a463693223"`);
        await queryRunner.query(`ALTER TABLE "orderdetail" DROP CONSTRAINT "FK_e39fd6401ce4d77ca49c8cb4f9f"`);
        await queryRunner.query(`DROP TABLE "orderdetail"`);
        await queryRunner.query(`DROP TABLE "nonconformity"`);
    }

}
