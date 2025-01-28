import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { AuthService } from "./auth.service";

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
}