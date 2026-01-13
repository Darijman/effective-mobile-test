import { IsEmail, IsNotEmpty, MinLength, IsOptional, IsString, MaxLength, Matches } from "class-validator";
import { Transform } from "class-transformer";

export class RegisterDto {
  @Transform(({ value }) => value?.trim())
  @IsString({ message: "Name must be a string" })
  @IsNotEmpty({ message: "Name should not be empty" })
  @MinLength(1, { message: "Name must be at least 1 character long" })
  @MaxLength(100, { message: "Name must be at most 100 characters long" })
  name: string;

  @Transform(({ value }) => value?.trim())
  @IsString({ message: "Last name must be a string" })
  @IsNotEmpty({ message: "Last name should not be empty" })
  @MinLength(1, { message: "Last name must be at least 1 character long" })
  @MaxLength(100, { message: "Last name must be at most 100 characters long" })
  lastName: string;

  @Transform(({ value }) => value?.trim())
  @IsOptional()
  @IsString({ message: "Middle name  must be a string" })
  @IsNotEmpty({ message: "Middle name should not be empty" })
  @MinLength(1, { message: "Middle name must be at least 1 character long" })
  @MaxLength(100, { message: "Middle name must be at most 100 characters long" })
  middleName?: string;

  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { message: "birthDate must be in YYYY-MM-DD format" })
  birthDate: string;

  @Transform(({ value }) => value?.trim())
  @IsEmail({}, { message: "Email must be a valid email address" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @Transform(({ value }) => value?.trim())
  @MaxLength(100, { message: "Password must be at most 100 characters long" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
