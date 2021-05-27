import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlaskModule } from 'src/flask/flask.module';
import { EquipmentResolver } from './equipment.resolver';
import { EquipmentService } from './equipment.service';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';
import { QueryFeedback, QueryFeedBackSchema } from './schemas/query-feedback.schema';

@Module({
  imports: [FlaskModule,
    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
      { name: QueryFeedback.name, schema: QueryFeedBackSchema },
    ]),
  ],
  providers: [EquipmentService, EquipmentResolver],
  controllers: [],
  exports: []
})
export class EquipmentModule { }
