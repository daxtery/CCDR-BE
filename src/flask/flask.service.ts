import { InjectQueue } from '@nestjs/bull';
import { HttpService, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { map } from 'rxjs/operators';
import { beAiConnection } from 'src/config';
import { JobPayload } from './flask.processor';

@Injectable()
export class FlaskService {
    constructor(
        @InjectQueue('flask') private readonly flaskQueue: Queue<JobPayload>,
        private readonly httpService: HttpService,
    ) { }

    async scheduleAddEquipmentInCluster(equipment_id: string) {
        await this.flaskQueue.add('add_equipment', {
            equipment_id,
        });
    }

    async scheduleRemoveEquipmentInCluster(equipment_id: string) {
        await this.flaskQueue.add('remove_equipment', {
            equipment_id,
        });
    }

    async scheduleUpdateEquipmentInCluster(equipment_id: string) {
        await this.flaskQueue.add('update_equipment', {
            equipment_id,
        });
    }

    async queryEquipements(query: string) {
        // FIXME: Handle errors
        let results = this.httpService.get<[string, number][]>(`${beAiConnection}/search/${query}`).pipe(map(response => response.data));
        return await results.toPromise();
    }

}
