import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class UpdateProductInput {
  @Field({ nullable: true })
  name?: string;

  @Field(type => Float, { nullable: true })
  price?: number;

  @Field(type => String, { nullable: true, defaultValue: 'active' })
  status?: 'active' | 'inactive';
}
