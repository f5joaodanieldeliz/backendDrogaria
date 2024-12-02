import { MigrationInterface, QueryRunner } from "typeorm";

export class Default1732862048814 implements MigrationInterface {
    name = 'Default1732862048814'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "celular" bigint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "clientes" DROP COLUMN "celular"`);
        await queryRunner.query(`ALTER TABLE "clientes" ADD "celular" integer NOT NULL`);
    }

}
