import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlaskModule } from 'src/flask/flask.module';
import { EquipmentResolver } from './equipment.resolver';
import { EquipmentService } from './equipment.service';
import { Equipment, EquipmentSchema } from './schemas/equipment.schema';

@Module({
  imports: [FlaskModule,
    MongooseModule.forFeature([
      { name: Equipment.name, schema: EquipmentSchema },
    ]),
  ],
  providers: [EquipmentService, EquipmentResolver],
  controllers: [],
  exports: []
})
export class EquipmentModule { }
