import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GraphQLModule } from '@nestjs/graphql';

import { connectionString } from './config';
import { join } from 'path';
import { FlaskModule } from './flask/flask.module';
import { AppResolver } from './app.resolver';
import { EquipmentModule } from './equipment/equipment.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(connectionString),
    GraphQLModule.forRoot(
      {
        debug: true,
        playground: true,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        sortSchema: true,
        context: ({ req }) => ({ req }),
      }),
    EquipmentModule,
    AuthModule,
    FlaskModule],
  providers: [AppResolver],
})
export class AppModule { }
