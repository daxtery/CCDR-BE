import { Field, InputType } from '@nestjs/graphql';


@InputType()
export class QueryOptions {

    @Field(type => String)
    query: string;

    @Field(type => Number, { nullable: true })
    limit?: number;
}