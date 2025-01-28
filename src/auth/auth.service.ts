import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { JwtService } from "@nestjs/jwt";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";


@Injectable()
export class AuthService {

    constructor(
        private readonly prismaService:PrismaService,
        private readonly jwtService:JwtService
    ){}

    async register({email, password}:CreateUserDto){
        try{
            const user = await this.prismaService.user.create({
                data: {
                    email,
                    password: bcrypt.hashSync(password, 10)
                }
            });
            return {
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            throw new NotFoundException('Algo salió mal')
        }
    }

    async login({email, password}:CreateUserDto){
        try{
            const user = await this.prismaService.user.findUnique({
                where: {
                    email
                }
            });
            if(!bcrypt.compareSync(password, user.password)) throw new BadRequestException('Email o contraseña incorrecta');
            return {
                token: this.getJwtToken({id: user.id})
            }
        }catch(err){
            throw new NotFoundException('Algo salió mal');
        }
    }

    private getJwtToken(payload: JwtPayload){
        const token = this.jwtService.sign(payload);
        return token;
    }

}