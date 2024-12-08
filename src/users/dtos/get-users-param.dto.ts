import { IsInt, IsOptional } from 'class-validator';

export class GetUsersParamDto {
  @IsOptional()
  @IsInt()
  id?: number;
}
