import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { EquipmentResults } from "./schemas/equipment-results";
import { SearchService } from "./search.service";
import { QueryOptions } from "./dtos/query-options"

@Resolver()
export class SearchResolver {

    constructor(private readonly searchService: SearchService) { }

    @Query(returns => [EquipmentResults])
    async queryEquipments(@Args("options") options: QueryOptions): Promise<EquipmentResults[]> {
        return await this.searchService.queryEquipments(options);
    }

}
