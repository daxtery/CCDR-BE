import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { FeedbackService } from 'src/feedback/feedback.service';
import { FlaskService } from 'src/flask/flask.service';
import { CreateEquipmentDto } from './dtos/create-equipment.dto';
import { Equipment } from './schemas/equipment.schema';

@Injectable()
export class EquipmentService {

    constructor(
        private readonly flaskService: FlaskService,
        private readonly feedbackService: FeedbackService,
        @InjectModel(Equipment.name) private readonly equipmentModel: Model<Equipment>,
    ) { }

    async addEquipment(equipment_dto: any) {
        const equipment = new this.equipmentModel(equipment_dto);
        // return equipment

        const saved_equipment = await equipment.save();
        this.flaskService.scheduleAddEquipmentInCluster(equipment._id);
        return saved_equipment
    }

    async updateEquipmentById(id: string, equipment_dto: CreateEquipmentDto) {
        const equipment = await this.equipmentModel.findByIdAndUpdate(id, equipment_dto);

        this.flaskService.scheduleUpdateEquipmentInCluster(id);
        this.feedbackService.removeFeedbackByEquipmentId(id);

        return equipment;
    }

    async removeEquipmentById(id: string) {
        await this.equipmentModel.findByIdAndRemove(id);

        this.flaskService.scheduleRemoveEquipmentInCluster(id);
        this.feedbackService.removeFeedbackByEquipmentId(id);

        // FIXME: Handle errors
        return true;
    }


    async queryById(id: string) {
        return await this.equipmentModel.findById(id);
    }

}
