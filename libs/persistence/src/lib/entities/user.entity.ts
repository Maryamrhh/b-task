// user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'id' }) // Generate a UUID for the id
  id!: string; // Ensure the id is a string

  @Column('varchar', {
    name: 'username',
    length: 12, // Specify a maximum length for the username
    unique: true, // Optional: make username unique if required
    nullable: false, // Cannot be null
  })
  username!: string;

  @Column('varchar', {
    name: 'password',
    nullable: false, // Cannot be null
  })
  password!: string;

  @CreateDateColumn({ name: 'created_on', default: "NOW()" }) // Automatically set on creation
  createdOn!: Date;

  @UpdateDateColumn({ name: 'updated_on', default: "NOW()" }) // Automatically updated on each save
  updatedOn!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true }) // Soft delete field
  deletedAt?: Date;
}
