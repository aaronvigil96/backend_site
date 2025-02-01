import { IsNumber, IsPositive, IsString } from "class-validator";

export class CreateProductDto {
    @IsString()
    name?: string;
    @IsNumber()
    @IsPositive()
    quantity?: number;
    @IsNumber()
    @IsPositive()
    price?: number;
    @IsString()
    img?: string;
    @IsNumber()
    categoryId:number;
}