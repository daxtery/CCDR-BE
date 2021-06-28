import { Prop, Schema, raw, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes } from 'mongoose';
import { GraphQLJSONObject } from 'graphql-type-json';

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class Extras {

    @Field(type => String, { nullable: false })
    name: String;
}

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

    @Field(type => Extras, { nullable: false })
    @Prop({ type: Object, required: true })
    extras: Extras;

    @Field(type => GraphQLJSONObject, { nullable: false })
    @Prop({ type: Object, required: true })
    equipmentDetails: Object;

}

export const EquipmentSchema = SchemaFactory.createForClass(Equipment);