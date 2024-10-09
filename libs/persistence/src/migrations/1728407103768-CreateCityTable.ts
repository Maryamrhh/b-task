import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateCityTable1728407103768 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'cities',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: false,
          },
          {
            name: 'post_code',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'country_abbreviation',
            type: 'varchar',
            isNullable: false,
          },
          {
            name: 'places',
            type: 'json',
            isNullable: false,
          },
          {
            name: 'created_on',
            type: 'timestamp',
            default: '"NOW()"',
          },
          {
            name: 'updated_on',
            type: 'timestamp',
            default: '"NOW()"',
            onUpdate: '"NOW()"',
          },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
      true
    );

    await queryRunner.createForeignKey(
      'cities',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('cities');
  }
}
