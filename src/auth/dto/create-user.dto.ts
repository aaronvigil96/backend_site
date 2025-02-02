import { IsEmail, IsEnum, IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsEmail()
    email: string;
    @IsString()
    password: string;
    @IsString()
    @IsOptional()
    role?: string;
}