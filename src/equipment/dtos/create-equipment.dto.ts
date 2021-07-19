import { InputType, Field, Int } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class ExtraDto {
    @Field(type => String, { nullable: false })
    name: string;

    @Field(type => String, { nullable: false })
    value: string;
}

@InputType()
export class CreateEquipmentDto {

    @Field(type => String, { nullable: false })
    area: String;

    @Field(type => String, { nullable: false })
    group: String;

    @Field(type => String, { nullable: false })
    description: String;

    @Field(type => String, { nullable: false })
    name: String;

    @Field(type => [ExtraDto], { nullable: false })
    extras: ExtraDto[];

    @Field(type => GraphQLJSONObject, { nullable: false })
    equipmentDetails: Object;
}