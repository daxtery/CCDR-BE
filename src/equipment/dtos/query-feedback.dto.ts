import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class queryFeedBackDto {

    @Field(type => String, { nullable: false })
    area: String;

    @Field(type => String, { nullable: false })
    type: String;
}