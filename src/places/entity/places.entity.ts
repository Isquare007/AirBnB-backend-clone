import { User } from 'src/auth/entity';
import { Cities } from 'src/cities/entity';
import { Reviews } from 'src/reviews/entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum Amenity {
  Gym = 'Gym',
  SwimmingPool = 'Swimming pool',
  Parking = 'Parking',
  Wifi = 'Wifi',
}

@Entity()
export class Places {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Cities, (city) => city.places)
  @JoinColumn({ name: 'city_id' })
  city: Cities;

  @ManyToOne(() => User, (user) => user.places)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => Reviews, (review) => review.place)
  reviews: Reviews[];

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'int' })
  numberOfRooms: number;

  @Column({ type: 'int' })
  numberOfBathrooms: number;

  @Column({ type: 'int' })
  maxGuest: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  pricePerNight: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  latitude: number;

  @Column({ type: 'decimal', precision: 10, scale: 6 })
  longitude: number;

  @Column('enum', { enum: Amenity, array: true, default: [] })
  amenities: Amenity[];
}
