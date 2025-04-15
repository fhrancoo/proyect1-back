import { Type } from "class-transformer";
import { IsNumber, IsPositive, IsString, MinLength } from "class-validator";

export class CreateProfileDto {

    @MinLength(5, { message: 'Bio debe tener mas de 5 caracters' })
    @IsString()
    bio: string;

    @Type(() => Number)
    @IsNumber()
    @IsPositive()
    userId: number;
}
