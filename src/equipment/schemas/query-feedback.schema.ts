import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Feedback {

    @Field(type => ID, { nullable: false })
    @Prop({ type: SchemaTypes.ObjectId, required: true })
    equipment_id: Document['_id'];

    @Field(type => Boolean, { nullable: false })
    @Prop({ type: Boolean, required: true })
    clicked: boolean;
}

const FeedbackSchema = SchemaFactory.createForClass(Feedback);


@ObjectType()
@Schema()
export class QueryFeedback extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    query: string;

    @Field(type => [Feedback], { nullable: false })
    @Prop({ type: [FeedbackSchema], required: true, _id: false })
    feedbacks: Feedback[];
}

export const QueryFeedBackSchema = SchemaFactory.createForClass(QueryFeedback);