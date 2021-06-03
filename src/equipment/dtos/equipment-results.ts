import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Equipment } from '../schemas/equipment.schema';

@ObjectType()
export class EquipmentResults {

    @Field(type => Equipment)
    equipment: Equipment;

    @Field(type => Float)
    score: Number;
}