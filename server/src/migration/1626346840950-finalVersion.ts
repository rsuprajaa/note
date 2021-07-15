import {MigrationInterface, QueryRunner} from "typeorm";

export class finalVersion1626346840950 implements MigrationInterface {
    name = 'finalVersion1626346840950'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "note_tags" DROP CONSTRAINT "FK_898115de9eadba996d4323ff0b6"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_92e67dc508c705dd66c94615576"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_dd3f70fdb9082542d648df377b7"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP CONSTRAINT "FK_71af7633de585b66b4db26734c9"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_8aa719f42b3c8b23c2d29f799c0"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e7fdd5c137211068b3b03cc7650"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "createdAt"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "updatedAt"`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "folders" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "folders" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "subject" character varying`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "UQ_d90243459a697eadb8ad56e9092"`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "body" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "body" SET DEFAULT ''`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD CONSTRAINT "FK_898115de9eadba996d4323ff0b6" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_92e67dc508c705dd66c94615576" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_dd3f70fdb9082542d648df377b7" FOREIGN KEY ("resource_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folders" ADD CONSTRAINT "FK_71af7633de585b66b4db26734c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_8aa719f42b3c8b23c2d29f799c0" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e7fdd5c137211068b3b03cc7650" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_e7fdd5c137211068b3b03cc7650"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP CONSTRAINT "FK_8aa719f42b3c8b23c2d29f799c0"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP CONSTRAINT "FK_71af7633de585b66b4db26734c9"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_dd3f70fdb9082542d648df377b7"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP CONSTRAINT "FK_87b8888186ca9769c960e926870"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP CONSTRAINT "FK_92e67dc508c705dd66c94615576"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP CONSTRAINT "FK_898115de9eadba996d4323ff0b6"`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "body" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "notes" ALTER COLUMN "body" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "UQ_d90243459a697eadb8ad56e9092" UNIQUE ("name")`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "favorites" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "subject"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "notes" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "folders" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "user_roles" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "tags" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "note_tags" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "priority" character varying`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "notes" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "folders" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "folders" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "users" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD "updatedAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD "createdAt" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_e7fdd5c137211068b3b03cc7650" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "favorites" ADD CONSTRAINT "FK_35a6b05ee3b624d0de01ee50593" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "notes" ADD CONSTRAINT "FK_8aa719f42b3c8b23c2d29f799c0" FOREIGN KEY ("folder_id") REFERENCES "folders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "folders" ADD CONSTRAINT "FK_71af7633de585b66b4db26734c9" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_dd3f70fdb9082542d648df377b7" FOREIGN KEY ("resource_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "user_roles" ADD CONSTRAINT "FK_87b8888186ca9769c960e926870" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tags" ADD CONSTRAINT "FK_92e67dc508c705dd66c94615576" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD CONSTRAINT "FK_6fa35b8ead30ef28cc1ac377b21" FOREIGN KEY ("note_id") REFERENCES "notes"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "note_tags" ADD CONSTRAINT "FK_898115de9eadba996d4323ff0b6" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
