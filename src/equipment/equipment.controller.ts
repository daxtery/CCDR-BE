import { Controller, Get, Param } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller()
export class EquipmentController {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Get('/search/:q')
    async queryEquipments(@Param('q') query: string) {
        return await this.equipmentService.queryEquipments(query);
    }

}
