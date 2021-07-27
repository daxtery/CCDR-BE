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

    async removeFeedbackByEquipmentId(id: string) {
        const result = await this.feedbackModel.updateMany(
            {},
            { $pull: { feedbacks: { equipment_id: id } } }
        );
    }

    async lastNUniqueQueries(n: number) {
        const results = await this.feedbackModel.aggregate<{ query: string }>(
            [{
                $group: {
                    _id: "$query",
                    id: { $last: "$_id" }
                }
            }, {
                $sort: {
                    "id": -1
                }
            }, {
                $project: {
                    "_id": 0,
                    "query": "$_id"
                }
            }]
        );

        return results.map(r => r.query);
    }

}
