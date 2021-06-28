import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';

import { ObjectType, Field, ID } from '@nestjs/graphql';


@ObjectType()
@Schema({ minimize: false }) // We don't minimize so we ALWAYS have an empty extras, at least
export class Equipment extends Document {

    @Field(type => ID, { nullable: false })
    _id: Document['_id'];

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    area: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: String, required: true })
    type: String;

    @Field(type => String, { nullable: false })
    @Prop({ type: Object, required: true })
    name: String;

    @Field(type => GraphQLJSONObject, { nullable: false, defaultValue: {} })
    @Prop({ type: Object, required: true })
    extras: Object;

    @Field(type => GraphQLJSONObject, { nullable: false })
    @Prop({ type: Object, required: true })
    equipmentDetails: Object;
}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);