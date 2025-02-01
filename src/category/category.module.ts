import { Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { CategoryService } from "./category.service";
import { CategoryController } from "./category.controller";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [PrismaModule, AuthModule],
    controllers: [CategoryController],
    providers: [CategoryService]
})
export class CategoryModule {

}