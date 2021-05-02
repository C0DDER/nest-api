import { BadRequestException, PipeTransform } from '@nestjs/common';
import { TaskStatus } from '../tasks.model';

export class TaskStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    TaskStatus.DONE,
    TaskStatus.IN_PROGRESS,
    TaskStatus.OPEN,
  ];

  transform(value: TaskStatus) {
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`value ${value} is invalid`);
    }

    return value;
  }

  isStatusValid(status: TaskStatus) {
    return this.allowedStatuses.includes(status);
  }
}
