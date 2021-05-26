import { InputType, Field } from '@nestjs/graphql';
import { Extras } from '../schemas/equipment.schema';

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
}