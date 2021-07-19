import { Module } from '@nestjs/common';
import { EquipmentModule } from 'src/equipment/equipment.module';
import { FlaskModule } from 'src/flask/flask.module';
import { SearchResolver } from './search.resolver';
import { SearchService } from './search.service';

@Module({
  imports: [FlaskModule, EquipmentModule],
  providers: [SearchResolver, SearchService,],
  controllers: [],
  exports: []
})
export class SearchModule { }
