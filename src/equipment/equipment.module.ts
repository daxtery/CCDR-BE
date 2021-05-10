import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlaskModule } from 'src/flask/flask.module';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';

@Module({
  imports: [FlaskModule,
    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
    ]),
  ],
  providers: [EquipmentService],
  controllers: [EquipmentController],
  exports: []
})
export class EquipmentModule { }
