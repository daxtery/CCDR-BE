import { Controller, Get, Param, Post, Req, Session } from '@nestjs/common';
import { EquipmentService } from './equipment.service';

@Controller()
export class EquipmentController {

    constructor(private readonly equipmentService: EquipmentService) { }

    @Get('/search/:q')
    async queryEquipments(@Session() session: Record<string, any>, @Param('q') query: string) {
        const { hash, equipments } = await this.equipmentService.queryEquipments(query);
        session.hash = hash;

        return equipments;
    }

    @Post('/feedback/:tag')
    async giveQueryFeedback(@Session() session: Record<string, any>, @Param('tag') tag: string) {
        if (session.hash) {
            const hash: string = session.hash;
            this.equipmentService.giveQueryFeedback(hash, tag);
        }
    }

}
