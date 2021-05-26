import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { FlaskService } from 'src/flask/flask.service';
import { Equipment } from './schemas/equipment.schema';

@Injectable()
export class EquipmentService {

    constructor(
        private readonly flaskService: FlaskService,
        @InjectModel(Equipment.name) private readonly equipmentModel: Model<Equipment>,
    ) { }

    async addEquipment(equipment_dto: any) {
        const equipment = new this.equipmentModel(equipment_dto);
        const saved_equipment = await equipment.save();

        //this.flaskService.scheduleAddEquipmentInCluster(equipment._id);

        return saved_equipment
    }

    async queryEquipments(query: string) {
        const ids = await this.flaskService.queryEquipements(query);
        
        const equipments_promises = await this.equipmentModel.find({_id: {$in: ids}});

        return equipments_promises;
    }

    async giveQueryFeedback(feedback: any) {

        console.log(feedback)
        //this.flaskService.giveQueryFeedback(feedback);
    }

}
