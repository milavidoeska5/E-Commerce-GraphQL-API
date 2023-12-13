import { Field, InputType, Int } from "@nestjs/graphql";

@InputType()
export class CreateImageInput{
    @Field()
    url: string

    @Field(type => Int, { defaultValue: 1000 })
    priority: number

    @Field(type => String, {nullable: true})
    productId?: string
}