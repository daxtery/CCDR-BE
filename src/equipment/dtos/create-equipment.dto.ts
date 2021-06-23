import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class CreateEquipmentDto {

    @Field(type => String, { nullable: false })
    area: String;

    @Field(type => String, { nullable: false })
    type: String;

    @Field(type => String, { nullable: false })
    name: String;

    @Field(type => GraphQLJSONObject, { nullable: false })
    extras: Object;

    @Field(type => GraphQLJSONObject, { nullable: false })
    equipmentDetails: Object;
}