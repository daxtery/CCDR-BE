import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';

import { ObjectType, Field, ID, GraphQLISODateTime, createUnionType, Union, registerEnumType, Int } from '@nestjs/graphql';

@ObjectType()
@Schema()
export class Equipment extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    area: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    type: String;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);