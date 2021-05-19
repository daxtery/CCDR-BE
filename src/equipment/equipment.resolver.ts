import { EquipmentService } from './equipment.service';

import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { Equipment } from './schemas/equipment.schema';
import { CreateEquipmentDto } from './dtos/create-equipment.dto';

@Resolver()
export class EquipmentResolver {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Query(returns => Equipment)
    async queryEquipments(@Args('query') query: string): Promise<Equipment[]> {
        return await this.equipmentService.queryEquipments(query);
    }

    @Mutation(returns => Equipment)
    async createEquipment(@Args('equipment') equipment: CreateEquipmentDto): Promise<Equipment> {

        return await this.equipmentService.addEquipment(equipment);
    }

    @Mutation(returns => )
    async giveQueryFeedback(@Args('queryFeedBack') queryFeedBack: Map<string, string[]>): Promise<void> {
        this.equipmentService.giveQueryFeedback(queryFeedBack);
    }
}
