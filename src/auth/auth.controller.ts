import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, SetMetadata, UseGuards } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";
import { Auth } from "./decorators/auth.decorator";
import { ValidRoles } from "./interfaces/valid-roles";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService:AuthService){}

    @Post('register')
    register(@Body() createUserDto:CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @Post('login')
    login(@Body() createUserDto:CreateUserDto){
        return this.authService.login(createUserDto);
    }

    @Get('users')
    @Auth(ValidRoles.ADMIN)
    getAllUsers(){
        return this.authService.getAllUsers();
    }

    @Delete('users/:id')
    @Auth(ValidRoles.ADMIN)
    deleteUserById(@Param('id', ParseIntPipe) id: number){
        return this.authService.deleteUserById(id);
    }
}