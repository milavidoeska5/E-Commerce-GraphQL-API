import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class UpdateImageInput {
  @Field({ nullable: true })
  url?: string;

  @Field(type => Int, { nullable: true })
  priority?: number;

  @Field(type => String, { nullable: true })
  productId?: string;
}
