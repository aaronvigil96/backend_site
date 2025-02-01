import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCategoryDto } from "./dto/create-category.dto";

@Injectable()
export class CategoryService {

    constructor(private readonly prismaService:PrismaService){}

    async getAll(){
        return await this.prismaService.category.findMany({
            where: {
                isActive: true
            }
        });
    }

    async getById(id:number){
        const data = await this.prismaService.category.findFirst({
            where: {
                id,
                isActive: true
            }
        })
        if(!data) throw new NotFoundException("That category doesn't exist");
        return data;
    }

    async createCategory(createCategoryDto:CreateCategoryDto){
        try {
            return await this.prismaService.category.create({
                data: {
                    ...createCategoryDto
                }
            })
        }catch(err){
            throw new NotFoundException('That category already exists');
        }
    }

    async updateCategory(id: number, createCategoryDto:CreateCategoryDto){
        try{
            const data = await this.prismaService.category.findFirst({
                where: {
                    id
                }
            });
            if(!data) throw new NotFoundException("That category doesn't exist");
            await this.prismaService.category.update({
                where: {
                    id
                },
                data: {
                    ...createCategoryDto,
                    isActive: true
                }
            })
            console.log(data);
        }catch(err){
            throw new NotFoundException("Oops error, check server logs")
        }
    }

    async deleteCategory(id: number){
        try{
            this.getById(id);
            await this.prismaService.category.update({
                where: {
                    id
                },
                data: {
                    isActive: false
                }
            })
        }catch(err){
            throw new NotFoundException("Oops error, check server logs");
        }
    }
}