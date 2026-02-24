import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { PropertyStatus, PropertyType } from '../../common/enums';
import { User } from '../../users/entities/user.entity';
import { Wishlist } from '../../wishlists/entities/wishlist.entity';
import { Booking } from '../../bookings/entities/booking.entity';
import { Chat } from '../../chats/entities/chat.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column({
    type: 'enum',
    enum: PropertyStatus,
    default: PropertyStatus.PENDING,
  })
  status: PropertyStatus;

  @Column({
    type: 'enum',
    enum: PropertyType,
  })
  type: PropertyType;

  @Column('int')
  price: number;

  @Column('int')
  bedrooms: number;

  @Column('int')
  bathrooms: number;

  @Column('int')
  area: number;

  @Column('boolean', { default: false })
  furnished: boolean;

  @Column('int')
  level: number;

  @Column()
  compound: string;

  @Column()
  paymentOption: string;

  @Column('timestamp')
  deliveryDate: Date;

  @Column()
  city: string;

  @Column()
  neighborhood: string;

  @Column()
  address: string;

  @Column('float')
  latitude: number;

  @Column('float')
  longitude: number;

  @Column('int', { nullable: true })
  aiPriceSuggested: number;

  @Column('int', { default: 0 })
  views: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column()
  sellerId: string;

  @ManyToOne(() => User, (user) => user.properties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sellerId' })
  seller: User;

  @OneToMany(() => Wishlist, (wishlist) => wishlist.property)
  wishlists: Wishlist[];

  @OneToMany(() => Booking, (booking) => booking.property)
  bookings: Booking[];

  @OneToMany(() => Chat, (chat) => chat.property)
  chats: Chat[];
}
