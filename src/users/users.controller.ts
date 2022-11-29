import {
    Body,
    Controller,
    Get,
    Post,
    Put,
    UseGuards,
    Param,
    Delete
  } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { JwtUserAuthGuard } from 'src/auth/jwt.user-auth.guard';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
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

    @ApiOperation({summary:"Foydalanuvchini olish"})
    @ApiResponse({status:200,type:User})
    @UseGuards(JwtUserAuthGuard)
    @Get(':id')
    getOne(@Param('id') id:number) {
      return this.userService.findById(id);
    }

    // @ApiOperation({summary:"Foydalanuvchini o'chirish"})
    // @ApiResponse({status:205,type:User})
    // @Delete(':id')
    // remove(@Param('id') id: number) {
    //     return this.userService.remove(id);
    // }

    @ApiOperation({summary:"Foydalanuvchilarni olish"})
    @ApiResponse({status:200,type:[User]})
    @UseGuards(JwtAuthGuard)
    @Get()
    getAll() {
      return this.userService.getAllUsers();
    }

    @ApiOperation({summary:"Foydalanuvchini update qilish"})
    @ApiResponse({status:203,type:User})
    @UseGuards(JwtUserAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateuser:updateUserDto) {
      return this.userService.update(id, updateuser);
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

    @ApiOperation({summary:"Foydalanuvchilarni faollashuvini o'chirish"})
    @ApiResponse({status:200,type:User})
    @Post('deactivate')
    deactivateUser(@Body() deactivateUserDto: ActivateUserDto) {
      return this.userService.deactivateUser(deactivateUserDto);
    }

    @ApiOperation({summary:"Foydanuvchini ban qilish uchun"})
    @ApiResponse({status:200,type:User})
    @Post('ban')
    banUser(@Body() banUser:BanUserDto){
      return this.userService.banUser(banUser)
    }

    @ApiOperation({summary:"Foydanaluvchini bandan yechish uchun"})
    @ApiResponse({status:200,type:User})
    @Post('offban')
    banoffUser(@Body() banoff:BanUserDto){
      return this.userService.offBanUser(banoff)
    }

}
