import { Body, Controller, Get, Param, Post, Req, Session } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { SHA256 } from 'crypto-js';

@Controller()
export class EquipmentController {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Get('/search/:q')
    async queryEquipments(@Param('q') query: string) {
        const hash = SHA256(query).toString();
        const equipements = await this.equipmentService.queryEquipments(query)
        return { hash, equipements };
    }

    @Post('/feedback/')
    async giveQueryFeedback(@Body() giveQueryFeedbackDto: Map<string, string[]>) {
        this.equipmentService.giveQueryFeedback(giveQueryFeedbackDto);
    }

}
