import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { createUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/login-auth.dto';

@ApiTags('Avtorizatsiya')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService:AuthService) { }
    @Post('/login')
    login(@Body() LoginDto:AuthDto){
        return this.authService.login(LoginDto)
    }

    @Post('/registration')
    registration(@Body() createUserDto:createUserDto) {
        return this.authService.registration(createUserDto)
    }
}
