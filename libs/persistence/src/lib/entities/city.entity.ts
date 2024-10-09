// city.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';
import { User } from './user.entity'; // Import your User entity

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid', { name: 'user_id', nullable: false })
  userId!: string;

  @Column('varchar', { name: 'post_code', nullable: false })
  postCode!: string;

  @Column('varchar', { name: 'country', nullable: false })
  country!: string;

  @Column('varchar', { name: 'country_abbreviation', nullable: false })
  countryAbbreviation!: string;

  @Column('json', { name: 'places', nullable: false })
  places!: Place[]; // Array of places as JSON

  @ManyToOne(() => User, { onDelete: 'CASCADE' }) // Assuming a User entity exists
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user!: User; // Reference to the User entity

  @CreateDateColumn({ name: 'created_on', default: "NOW()" }) // Automatically set on creation
  createdOn!: Date;

  @UpdateDateColumn({ name: 'updated_on', default: "NOW()" }) // Automatically updated on each save
  updatedOn!: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true }) // Soft delete field
  deletedAt?: Date;
}

export class Place {
  placeName!: string;
  state!: string;
  abbreviation!: string;
  latitude!: string;
  longitude!: string;
}
