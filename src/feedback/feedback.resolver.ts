import { Query, Resolver, Args, Mutation } from "@nestjs/graphql";
import { QueryFeedBackDto } from './dtos/query-feedback.dto';
import { FeedbackService } from "./feedback";

@Resolver()
export class FeedbackResolver {

    constructor(private readonly feedbackService: FeedbackService) { }

    @Mutation(returns => Boolean, { nullable: true })
    async storeQueryFeedback(@Args('queryFeedBack') queryFeedBack: QueryFeedBackDto): Promise<boolean> {
        return this.feedbackService.storeQueryFeedback(queryFeedBack);
    }
}
