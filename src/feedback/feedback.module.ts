import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FlaskModule } from 'src/flask/flask.module';
import { FeedbackService } from './feedback.service';
import { FeedbackResolver } from './feedback.resolver';
import { QueryFeedback, QueryFeedBackSchema } from './schemas/query-feedback.schema';

import mongoose from 'mongoose';

// NOTE: We define these options because of deprecation warnings

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

@Module({
  imports: [FlaskModule,
    MongooseModule.forFeature([
      { name: QueryFeedback.name, schema: QueryFeedBackSchema },
    ]),
  ],
  providers: [FeedbackService, FeedbackResolver],
  controllers: [],
  exports: [FeedbackService,]
})
export class FeedbackModule { }
