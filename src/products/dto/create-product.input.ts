import { Field, Float, InputType } from "@nestjs/graphql";

@InputType()
export class CreateProductInput{
    @Field()
    name: string;

    @Field(type => Float)
    price: number;

    @Field(type => String, { defaultValue: 'active' })
    status: 'active' | 'inactive';

}