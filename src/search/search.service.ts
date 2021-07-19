import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Mongoose } from 'mongoose';
import { EquipmentService } from 'src/equipment/equipment.service';
import { FlaskService } from 'src/flask/flask.service';
import { EquipmentResults } from './dtos/equipment-results';

@Injectable()
export class SearchService {

    constructor(
        private readonly flaskService: FlaskService,
        private readonly equipmentService: EquipmentService,
    ) { }

    async queryEquipments(query: string) {
        const results = await this.flaskService.queryEquipements(query);

        const equipments_results: Array<EquipmentResults> = await Promise.all(results.map(async ([id, score]) => {

            const equipment = await this.equipmentService.queryById(id);

            return { equipment, score };
        }));

        return equipments_results;
    }

}
