import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterTasks: GetTasksFilterDto): Task[] {
    if (Object.keys(filterTasks).length) {
      return this.tasksService.getTasksWithFilter(filterTasks);
    }

    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task | void {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): Task[] {
    return this.tasksService.deleteTaskById(id);
  }

  @Patch('/:id/status')
  updateTask(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task | void {
    return this.tasksService.updateTask(id, status);
  }
}
