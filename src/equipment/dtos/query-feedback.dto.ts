import { ObjectType, InputType, Field, ID, Float } from '@nestjs/graphql';


@InputType()
export class FeedBack {

    @Field(type => String, { nullable: false })
    _id: string;

    @Field(type => Float, { nullable: false })
    score: number;

    @Field(type => Boolean, { nullable: false })
    clicked: boolean;
}

@InputType()
export class QueryFeedBackDto {

    @Field(type => String, { nullable: false })
    query: string;

    @Field(type => [FeedBack], { nullable: false })
    feedBacks: Array<FeedBack>;
}

