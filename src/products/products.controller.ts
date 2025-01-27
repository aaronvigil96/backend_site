import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Post } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { SkipThrottle } from "@nestjs/throttler";

@Controller('products')
export class ProductsController {

    constructor(private readonly productsService:ProductsService){}

    @SkipThrottle()
    @Get()
    getAll(){
        return this.productsService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe)id: number){
        return this.productsService.getById(id);
    }

    @Post()
    create(@Body() createProductDto:CreateProductDto){
        return this.productsService.create(createProductDto);
    }
}