import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student, StudentDocument } from './schemas/student.schema';

@Injectable()
export class StudentsService {
  constructor(@InjectModel(Student.name) private studentModel: Model<StudentDocument>) {}

  // Create a student
  async create(studentData: Partial<Student>): Promise<Student> {
    const student = new this.studentModel(studentData);
    return student.save();
  }

  // Get all students
  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  // Get student by id
  async findOne(id: string): Promise<Student> {
    const student = await this.studentModel.findById(id).exec();
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return student;
  }

  // Update student by id
  async update(id: string, updateData: Partial<Student>): Promise<Student> {
    const student = await this.studentModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return student;
  }

  // Delete student by id
  async remove(id: string): Promise<{ message: string }> {
    const student = await this.studentModel.findByIdAndDelete(id).exec();
    if (!student) throw new NotFoundException(`Student with id ${id} not found`);
    return { message: 'Student deleted successfully' };
  }
}