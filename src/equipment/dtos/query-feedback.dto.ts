import { ObjectType, InputType, Field, ID } from '@nestjs/graphql';


@InputType()
export class FeedBack {

    @Field(type => String, { nullable: false })
    _id: String;

    @Field(type => Boolean, { nullable: false })
    clicked: Boolean;
}

@InputType()
export class QueryFeedBackDto {

    @Field(type => String, { nullable: false })
    query: String;

    @Field(type => [FeedBack], { nullable: false })
    feedBacks: Array<FeedBack>;
}

