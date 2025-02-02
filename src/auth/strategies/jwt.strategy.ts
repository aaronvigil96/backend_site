import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

    constructor(
        private readonly prismaService:PrismaService,
        private readonly configService:ConfigService
    ){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('SECRET_KEY'),
            passReqToCallback: true
        })
    }

    async validate(req: Request, jwtPayload:JwtPayload) {
        const {id} = jwtPayload;
        const user = await this.prismaService.user.findUnique({
            where: {
                id
            },
            select: {
                email: true,
                id: true,
                role: true
            }
        });
        if(!user) throw new UnauthorizedException('Token are not valid');
        return user;
    }
}