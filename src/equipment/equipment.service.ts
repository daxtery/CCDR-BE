import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { FlaskService } from 'src/flask/flask.service';
import { Equipment } from './schemas/equipment.schema';
import { QueryFeedBackDto } from './dtos/query-feedback.dto';
import { Feedback, QueryFeedback } from './schemas/query-feedback.schema';
import { EquipmentResults } from './dtos/equipment-results';

@Injectable()
export class EquipmentService {

    constructor(
        private readonly flaskService: FlaskService,
        @InjectModel(Equipment.name) private readonly equipmentModel: Model<Equipment>,
        @InjectModel(QueryFeedback.name) private readonly feedbackModel: Model<QueryFeedback>,
    ) { }

    async addEquipment(equipment_dto: any) {
        const equipment = new this.equipmentModel(equipment_dto);
        const saved_equipment = await equipment.save();

        this.flaskService.scheduleAddEquipmentInCluster(equipment._id);

        return saved_equipment
    }

    async queryById(id: string) {
        return await this.equipmentModel.findById(id);
    }

    async queryEquipments(query: string) {
        const results = await this.flaskService.queryEquipements(query);

        const ids = results.map((result) => { return result[0] })

        const equipments_promises = await this.equipmentModel.find({ _id: { $in: ids } }).exec();

        const equipments_results: Array<EquipmentResults> = results.map((result) => {

            const id = result[0]

            const score = Number(result[1])

            const equipment = equipments_promises.find((equipment) => { return equipment.id == id })

            return <EquipmentResults>{ equipment: equipment, score: score }
        })

        return equipments_results;
    }

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
