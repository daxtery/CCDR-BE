import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { EquipmentService } from 'src/equipment/equipment.service';
import { FlaskService } from 'src/flask/flask.service';
import { QueryOptions } from './dtos/query-options';
import { EquipmentResults } from './schemas/equipment-results';

@Injectable()
export class SearchService {

    constructor(
        private readonly flaskService: FlaskService,
        private readonly equipmentService: EquipmentService,
    ) { }

    async queryEquipments(options: QueryOptions) {
        const results = await this.flaskService.queryEquipements(options.query, options.limit ?? 0);

        const equipments_results: Array<EquipmentResults> = await Promise.all(results.map(async ([id, score]) => {

            const equipment = await this.equipmentService.queryById(id);

            return { equipment, score };
        }));

        return equipments_results;
    }

}
