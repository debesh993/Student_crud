import { 
  Controller, 
  Get, 
  Post, 
  Body, 
  Param, 
  Put, 
  Delete, 
  NotFoundException, 
  BadRequestException 
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { Student } from './schemas/student.schema';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @Post()
  async create(@Body() studentData: Partial<Student>) {
    try {
      return await this.studentsService.create(studentData);
    } catch (error) {
      // Example: duplicate key error (email already exists)
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      // default for other errors
      throw new BadRequestException(error.message || 'Failed to create student');
    }
  }

  @Get()
  async findAll() {
    return this.studentsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findOne(id);
    if (!student) {
      throw new NotFoundException('Student not found');
    }
    return student;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateData: Partial<Student>) {
    try {
      const updated = await this.studentsService.update(id, updateData);
      if (!updated) {
        throw new NotFoundException('Student not found');
      }
      return updated;
    } catch (error) {
      // duplicate key error for update
      if (error.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw new BadRequestException(error.message || 'Failed to update student');
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const deleted = await this.studentsService.remove(id);
    if (!deleted) {
      throw new NotFoundException('Student not found');
    }
    return { success: true, message: 'Student deleted successfully' };
  }
}