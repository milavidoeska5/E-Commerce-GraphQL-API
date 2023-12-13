import { Field, Float, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Image } from '../images/image.entity';
import { Column, Entity, ObjectIdColumn, OneToMany } from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @ObjectIdColumn()
  @Field(type => String)
  id: ObjectId;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field(type => Float)
  price: number;

  @Column()
  @Field(type => String, { defaultValue: 'active' })
  status: 'active' | 'inactive';

  @OneToMany(() => Image, image => image.product)
  @Field(type => [Image], { nullable: true })
  images?: Image[];
}
