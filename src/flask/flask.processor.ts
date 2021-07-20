import { Processor, Process } from '@nestjs/bull';
import { HttpService } from '@nestjs/common';
import { Job } from 'bull';
import { beAiConnection } from 'src/config';

export interface JobPayload {
    equipment_id: string
};

@Processor('flask')
export class FlaskProcessor {

    constructor(private readonly httpService: HttpService) { }

    @Process('add_equipment')
    async addEquipmentInCluster(job: Job<JobPayload>) {
        // FIXME: Handle errors

        this.httpService.post(`${beAiConnection}/equipment/${job.data.equipment_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        );
    }

    @Process('update_equipment')
    async updateEquipmentInCluster(job: Job<JobPayload>) {
        // FIXME: Handle errors

        this.httpService.put(`${beAiConnection}/equipment/${job.data.equipment_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        );
    }

    @Process('remove_equipment')
    async RemoveEquipmentInCluster(job: Job<JobPayload>) {
        // FIXME: Handle errors

        this.httpService.delete(`${beAiConnection}/equipment/${job.data.equipment_id}`).subscribe(
            val => console.info(val),
            error => console.error(error)
        );
    }
}