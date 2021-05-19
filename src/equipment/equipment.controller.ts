import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller()
export class EquipmentController {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Get('/search/:q')
    async queryEquipments(@Param('q') query: string) {
        const equipements = await this.equipmentService.queryEquipments(query)
        return equipements;
    }

    @Post('/feedback/')
    async giveQueryFeedback(@Body() giveQueryFeedbackDto: Map<string, string[]>) {
        this.equipmentService.giveQueryFeedback(giveQueryFeedbackDto);
    }

}
