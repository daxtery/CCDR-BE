import { InjectQueue } from '@nestjs/bull';
import { HttpService, Injectable } from '@nestjs/common';
import { Queue } from 'bull';
import { map } from 'rxjs/operators';
import { beAiConnection } from 'src/config';
import { Equipment } from 'src/equipment/schemas/equipment.schema';

@Injectable()
export class FlaskService {

    constructor(@InjectQueue('flask') private readonly flaskQueue: Queue,
        private readonly httpService: HttpService) { }

    async scheduleAddEquipmentInCluster(equipment_id: Equipment['_id']) {
        await this.flaskQueue.add('add_equipment', {
            equipment_id,
        });
    }

    async queryEquipements(query: string) {
        // FIXME: Handle errors
        let results_and_hash = this.httpService.get<{ hash: string, results: string[] }>(`${beAiConnection}/search/${query}`).pipe(map(response => response.data));
        return await results_and_hash.toPromise();
    }

    async giveQueryFeedback(query_hash: string, tag: string) {
        // FIXME: Handle errors
        return await this.httpService.post(`${beAiConnection}/feedback/${query_hash}/${tag}`).toPromise();
    }

}
