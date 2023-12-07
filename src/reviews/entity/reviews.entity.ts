import { User } from 'src/auth/entity';
import { Places } from 'src/places/entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  // OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Reviews {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Places, (place) => place.reviews)
  place: Places;

  @ManyToOne(() => User, (user) => user.places)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  review: string;
}
