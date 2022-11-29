import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
  } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
  // import { ValidationPipe } from 'src/pipe/validation.pipe';
  import { ActivateUserDto } from './dto/activate-user.dto';
  import { AddRoleDto } from './dto/add-role.dto';
  import { createUserDto } from './dto/create-user.dto';
import { User } from './users.model';
  import { UsersService } from './users.service';
  
  @ApiTags('Foydalanuvchilar')
  @Controller('users')
  export class UsersController {
    constructor(private readonly userService: UsersService) {}
  
    //   @UsePipes(ValidationPipe)
    @ApiOperation({summary:"Foydaluvchi yaratish"})
    @ApiResponse({status:201,type:User})
    @Post()
    create(@Body() createUserDto: createUserDto) {
      return this.userService.createUser(createUserDto);
    }
  
    //   @Roles('ADMIN')
    //   @UseGuards(RolesGuard)
    @ApiOperation({summary:"Foydalanuvchilarni olish"})
    @ApiResponse({status:200,type:[User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.userService.getAllUsers();
    }
  
    @ApiOperation({summary:"Foydalanuvchiga rol berish"})
    @ApiResponse({status:200,type:User})
    @Post('role')
    addRole(@Body() addRoleDto: AddRoleDto) {
      return this.userService.addRole(addRoleDto);
    }
  
    @ApiOperation({summary:"Foydalanuvchilarni faollashtirish"})
    @ApiResponse({status:200,type:User})
    @Post('activate')
    activateUser(@Body() activateUserDto: ActivateUserDto) {
      return this.userService.activateUser(activateUserDto);
    }
  }
