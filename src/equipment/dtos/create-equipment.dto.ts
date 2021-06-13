import { InputType, Field, Int } from '@nestjs/graphql';
import { Extras } from '../schemas/equipment.schema';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
class ExtrasInput {

    @Field(type => String, { nullable: false})
    name: String;
}

@InputType()
export class CreateEquipmentDto {

    @Field(type => String, { nullable: false })
    area: String;

    @Field(type => String, { nullable: false })
    type: String;

    @Field(type => ExtrasInput, { nullable: false })
    extras: Extras;

    @Field(type => GraphQLJSONObject, { nullable: false })
    equipmentDetails: Object;
}