import { MigrationInterface, QueryRunner } from "typeorm";

export class Addpermission1703876400105 implements MigrationInterface {
    name = 'Addpermission1703876400105'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "permission" ("id" uniqueidentifier NOT NULL CONSTRAINT "DF_3b8b97af9d9d8807e41e6f48362" DEFAULT NEWSEQUENTIALID(), "name" nvarchar(255) NOT NULL, CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "roles_permission_permission" ("rolesId" uniqueidentifier NOT NULL, "permissionId" uniqueidentifier NOT NULL, CONSTRAINT "PK_840c403f6caab2747469bad9052" PRIMARY KEY ("rolesId", "permissionId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_5633105c717323b1b31d36fd56" ON "roles_permission_permission" ("rolesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_27fcec6fe40044fe3d2e208fea" ON "roles_permission_permission" ("permissionId") `);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" ADD CONSTRAINT "FK_5633105c717323b1b31d36fd56d" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" ADD CONSTRAINT "FK_27fcec6fe40044fe3d2e208feab" FOREIGN KEY ("permissionId") REFERENCES "permission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" DROP CONSTRAINT "FK_27fcec6fe40044fe3d2e208feab"`);
        await queryRunner.query(`ALTER TABLE "roles_permission_permission" DROP CONSTRAINT "FK_5633105c717323b1b31d36fd56d"`);
        await queryRunner.query(`DROP INDEX "IDX_27fcec6fe40044fe3d2e208fea" ON "roles_permission_permission"`);
        await queryRunner.query(`DROP INDEX "IDX_5633105c717323b1b31d36fd56" ON "roles_permission_permission"`);
        await queryRunner.query(`DROP TABLE "roles_permission_permission"`);
        await queryRunner.query(`DROP TABLE "permission"`);
    }

}
