import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateProductDto } from "./dto/create-product.dto";

@Injectable()
export class ProductsService {

    constructor(private readonly prismaService:PrismaService){}
    
    async getAll() {
        const products = await this.prismaService.product.findMany({});
        return products;
    }

    async getById(id: number){
        return await this.prismaService.product.findUnique({
            where: {
                id
            }
        })
    }

    async create({name, quantity, price, img}:CreateProductDto){
        return await this.prismaService.product.create({
            data: {
                name,
                quantity,
                price,
                img,
            }
        })
    }

    async update(id: number, createProductDto:CreateProductDto){
        try{
            return await this.prismaService.product.update({
                where: {
                    id
                },
                data: {
                    ...createProductDto
                }
            })
        }catch(err){
            throw new NotFoundException()
        }
    }
}