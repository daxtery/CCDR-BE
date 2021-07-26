import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Equipment } from '../../equipment/schemas/equipment.schema';

@ObjectType()
export class EquipmentResults {

    @Field(type => Equipment)
    equipment: Equipment;

    @Field(type => Float)
    score: Number;
}