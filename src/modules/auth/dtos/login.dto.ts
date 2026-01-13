import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";
import { Transform } from "class-transformer";

export class LoginDto {
  @Transform(({ value }) => value?.trim())
  @IsEmail({}, { message: "Email must be a valid email address" })
  @IsNotEmpty({ message: "Email cannot be empty" })
  email: string;

  @Transform(({ value }) => value?.trim())
  @MaxLength(100, { message: "Password must be at most 100 characters long" })
  @MinLength(6, { message: "Password must be at least 6 characters long" })
  password: string;
}
