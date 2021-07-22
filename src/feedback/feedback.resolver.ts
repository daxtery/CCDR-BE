import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { Int } from "type-graphql/dist/scalars";
import { QueryFeedBackDto } from './dtos/query-feedback.dto';
import { FeedbackService } from "./feedback.service";

@Resolver()
export class FeedbackResolver {

    constructor(private readonly feedbackService: FeedbackService) { }

    @Mutation(returns => Boolean, { nullable: true })
    async storeQueryFeedback(@Args('queryFeedBack') queryFeedBack: QueryFeedBackDto): Promise<boolean> {
        return this.feedbackService.storeQueryFeedback(queryFeedBack);
    }

    @Query(returns => [String])
    async lastNUniqueQueries(@Args('n', { type: () => Int }) n: number) {
        return await this.feedbackService.lastNUniqueQueries(n);
    }
}
