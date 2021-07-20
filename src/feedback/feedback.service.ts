import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { QueryFeedBackDto } from './dtos/query-feedback.dto';
import { Feedback, QueryFeedback } from './schemas/query-feedback.schema';

@Injectable()
export class FeedbackService {

    constructor(
        @InjectModel(QueryFeedback.name) private readonly feedbackModel: Model<QueryFeedback>,
    ) { }

    async storeQueryFeedback(feedback: QueryFeedBackDto) {
        const data: Pick<QueryFeedback, "query" | "feedbacks"> = {
            query: feedback.query,
            feedbacks: feedback.feedBacks.map(f => {
                return { equipment_id: f._id, score: f.clicked ? f.score : 0. }
            })
        }

        try {
            await new this.feedbackModel(data).save();
            return true;
        }

        catch (e) {
            console.error(e);
            return false;
        }
    }

}
