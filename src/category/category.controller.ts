import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { AuthGuard } from "@nestjs/passport";

@Controller('categories')
export class CategoryController {

    constructor(private readonly categoryService:CategoryService){}

    @Get()
    getAll(){
        return this.categoryService.getAll();
    }

    @Get(':id')
    getById(@Param('id', ParseIntPipe )id:number){
        return this.categoryService.getById(id);
    }

    @Post()
    @UseGuards(AuthGuard())
    create(@Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.createCategory(createCategoryDto);
    }

    @Patch(':id')
    @UseGuards(AuthGuard())
    update(@Param('id', ParseIntPipe)id: number, @Body() createCategoryDto:CreateCategoryDto){
        return this.categoryService.updateCategory(id, createCategoryDto);
    }

    @Delete(':id')
    @UseGuards(AuthGuard())
    delete(@Param('id', ParseIntPipe)id: number){
        return this.categoryService.deleteCategory(id);
    }
}