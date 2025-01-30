import { Body, Controller, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { CreateProductDto } from "./dto/create-product.dto";
import { SkipThrottle } from "@nestjs/throttler";
import { AuthGuard } from "@nestjs/passport";

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
    @UseGuards(AuthGuard())
    create(@Body() createProductDto:CreateProductDto){
        return this.productsService.create(createProductDto);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(@Param('id', ParseIntPipe) id: number, @Body() createProductDto:CreateProductDto){
        return this.productsService.update(id, createProductDto);
    }
}