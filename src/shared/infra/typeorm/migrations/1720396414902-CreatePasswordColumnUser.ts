import { query } from "express";
import {
	Column,
	type MigrationInterface,
	type QueryRunner,
	TableColumn,
} from "typeorm";

export class CreatePasswordColumnUser1720396414902
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.addColumn(
			"users",
			new TableColumn({
				name: "password",
				type: "varchar",
				isNullable: false,
			}),
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropColumn("users", "password");
	}
}
