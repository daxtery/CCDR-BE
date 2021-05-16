import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateEquipmentDto {

    @Field(type => String, { nullable: false })
    area: String;

    @Field(type => String, { nullable: false })
    type: String;
}