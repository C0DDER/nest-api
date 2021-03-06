import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../taskStatus.enum';

export class GetTasksFilterDto {
  @IsOptional()
  @IsIn([TaskStatus.OPEN, TaskStatus.DONE, TaskStatus.IN_PROGRESS])
  status: TaskStatus;

  @IsNotEmpty()
  @IsOptional()
  search: string;
}
