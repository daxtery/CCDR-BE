import { EquipmentService } from './equipment.service';

import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { Equipment } from './schemas/equipment.schema';
import { CreateEquipmentDto } from './dtos/create-equipment.dto';
import { QueryFeedBackDto } from './dtos/query-feedback.dto';
import { EquipmentResults } from './dtos/equipment-results';

@Resolver()
export class EquipmentResolver {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Query(returns => [EquipmentResults])
    async queryEquipments(@Args('query') query: string): Promise<EquipmentResults[]> {
        return await this.equipmentService.queryEquipments(query);
    }

    @Query(returns => Equipment)
    async queryById(@Args('id') id: string): Promise<Equipment> {
        return await this.equipmentService.queryById(id);
    }

    @Mutation(returns => Equipment)
    async createEquipment(@Args('equipment') equipment: CreateEquipmentDto): Promise<Equipment> {

        return await this.equipmentService.addEquipment(equipment);
    }

    @Mutation(returns => Boolean, { nullable: true })
    async storeQueryFeedback(@Args('queryFeedBack') queryFeedBack: QueryFeedBackDto): Promise<boolean> {
        return this.equipmentService.storeQueryFeedback(queryFeedBack);
    }
}
