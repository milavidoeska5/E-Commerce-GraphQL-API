import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ObjectId } from 'mongodb';
import { Product } from '../products/product.entity';
import { Column, Entity, ManyToOne, ObjectIdColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Image {
  @Field(type => String)
  @ObjectIdColumn()
  id: ObjectId;

  @Field()
  @Column()
  url: string;

  @Field(type => Int, { defaultValue: 1000 })
  @Column()
  priority: number;

  @Column()
  @Field(type => String, { nullable: true })
  productId?: string;

  @ManyToOne(() => Product, product => product.images)
  @Field(type => Product, { nullable: true })
  product?: Product;
}
