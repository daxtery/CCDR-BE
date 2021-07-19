import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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
        // return equipment

        const saved_equipment = await equipment.save();
        this.flaskService.scheduleAddEquipmentInCluster(equipment._id);
        return saved_equipment
    }

    async queryById(id: string) {
        return await this.equipmentModel.findById(id);
    }

}
