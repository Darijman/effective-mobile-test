import { IsOptional, IsInt, Min, Max } from "class-validator";
import { Transform } from "class-transformer";

export class UsersPaginationDto {
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt({ message: "Skip must be an integer" })
  @Min(0, { message: "Skip must be at least 0" })
  skip?: number;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsInt({ message: "Take must be an integer" })
  @Min(1, { message: "Take must be at least 1" })
  @Max(100, { message: "Take cannot be more than 100" })
  take?: number;
}
