import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlaskModule } from 'src/flask/flask.module';
import { FeedbackService } from './feedback';
import { FeedbackResolver } from './feedback.resolver';
import { QueryFeedback, QueryFeedBackSchema } from './schemas/query-feedback.schema';

@Module({
  imports: [FlaskModule,
    MongooseModule.forFeature([
      { name: QueryFeedback.name, schema: QueryFeedBackSchema },
    ]),
  ],
  providers: [FeedbackService, FeedbackResolver],
  controllers: [],
  exports: []
})
export class FeedbackModule { }
