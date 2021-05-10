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
        await equipment.save();
        this.flaskService.scheduleAddEquipmentInCluster(equipment._id);
    }

    async queryEquipments(query: string) {
        const ids = await this.flaskService.queryEquipements(query);
        const equipments_promises = ids.map(async id => await this.equipmentModel.findById(id));
        const equipments = Promise.all(
            equipments_promises
        )

        return await equipments;
    }

}
