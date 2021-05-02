import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v1 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'cbb4d400-a667-11eb-92c8-e1a69f9cbf9e',
      title: '1',
      description: '2',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTaskById(id: string): Task | undefined {
    return this.tasks.find((task) => task.id === id);
  }

  getTasksWithFilter(filterTasks: GetTasksFilterDto): Task[] {
    const { status, search } = filterTasks;

    let tasks = this.getAllTasks();

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (search) {
      tasks = this.tasks.filter(
        (task) =>
          task.description.includes(search) || task.title.includes(search),
      );
    }
    return tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;

    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTaskById(id: string): Task[] {
    this.tasks = this.tasks.filter((task) => task.id !== id);

    return this.getAllTasks();
  }

  updateTask(id: string, status: TaskStatus): Task | void {
    const task = this.getTaskById(id);

    if (task) {
      task.status = status;
    }

    return task || undefined;
  }
}
