import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name: string;
    @IsNumber()
    @IsPositive()
    quantity: number;
}