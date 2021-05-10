import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { beAiConnection } from 'src/config';
import { catchError, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Equipment } from 'src/equipment/schemas/equipment.schema';

@Processor('flask')
export class FlaskProcessor {

    constructor(private readonly httpService: HttpService) { }

    @Process('add_equipment')
    async addEquipmentInCluster(job: Job<{ equipment_id: String }>) {
        // FIXME: Handle errors

        this.httpService.post(`${beAiConnection}/equipment/${job.data.equipment_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        );
    }
}