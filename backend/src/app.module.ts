import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsController } from './students/students.controller';
import { StudentsService } from './students/students.service';
import { Student, StudentSchema } from './students/schemas/student.schema';


@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
  ],
  controllers: [AppController, StudentsController],
  providers: [AppService, StudentsService],
})
export class AppModule {}
