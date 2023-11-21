import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  // OneToMany,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text', unique: true })
  email: string;

  @Column({ type: 'text' })
  firstName: string;

  @Column({ type: 'text' })
  lastName: string;

  @Column({ type: 'text', unique: true })
  password: string;

  // @OneToMany(() => Places, (place) => place.user, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // places: Places[];

  // @OneToMany(() => Reviews, (review) => review.user, {
  //   cascade: true,
  //   onDelete: 'CASCADE',
  // })
  // reviews: Reviews[];

  @Column({ type: 'boolean', default: false })
  isVerified?: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @CreateDateColumn()
  updatedAt: Date;
}
