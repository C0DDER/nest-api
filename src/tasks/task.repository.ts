import { NotFoundException } from '@nestjs/common';
import { DeleteResult, EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { Task } from './task.entity';
import { TaskStatus } from './taskStatus.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (status) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `% ${search} %` },
      );
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = new Task();
    task.description = description;
    task.title = title;
    task.status = TaskStatus.OPEN;
    await task.save();

    return task;
  }

  async deleteTaskById(id: number): Promise<DeleteResult> {
    const result = await this.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException();
    }

    return result;
  }

  async getTaskById(id: number): Promise<Task> {
    const task = await this.findOne({ id });

    if (!task) {
      throw new NotFoundException();
    }

    return task;
  }

  async updateTask(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;
    await task.save();

    return task;
  }
}
