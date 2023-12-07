import { Places } from 'src/places/entity';
import { States } from 'src/states/entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cities {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @ManyToOne(() => States, (states) => states.cities, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'state_id' })
  state: States;

  @OneToMany(() => Places, (place) => place.city)
  places: Places[];
}
