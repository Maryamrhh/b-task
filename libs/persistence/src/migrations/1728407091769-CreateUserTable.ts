import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateUserTable1728407091769 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'uuid',
          },
          {
            name: 'username',
            type: 'varchar',
            length: '12',
            isUnique: true, // Ensure username is unique
            isNullable: false, // Cannot be null
          },
          {
            name: 'password',
            type: 'varchar',
            isNullable: false, // Cannot be null
          },
          {
            name: 'created_on',
            type: 'timestamp',
            default: "NOW()",
          },
          {
            name: 'updated_on',
            type: 'timestamp',
            default: "NOW()",
            onUpdate: "NOW()",
          },
          { name: 'deleted_at', type: 'timestamp', isNullable: true },
        ],
      }),
      true // Whether to create table if it doesn't exist
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
