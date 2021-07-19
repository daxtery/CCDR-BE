import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { EquipmentResults } from "./dtos/equipment-results";
import { SearchService } from "./search.service";

@Resolver()
export class SearchResolver {

    constructor(private readonly searchService: SearchService) { }

    @Query(returns => [EquipmentResults])
    async queryEquipments(@Args('query') query: string): Promise<EquipmentResults[]> {
        return await this.searchService.queryEquipments(query);
    }

}
