import { IsNumber, IsPositive, IsString, MinLength, IsEmail } from "class-validator";


export class CreateUserDto {

  @IsString()
  name: string

  @IsEmail()
  email: string
}
