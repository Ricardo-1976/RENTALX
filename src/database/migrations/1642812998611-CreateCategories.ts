import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategories1642812998611 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: "categoreis",
          columns: [
            
          ]
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
