import { Body, Controller, Get, Param, Post, Delete,Put } from '@nestjs/common';
import { ApiOperation, ApiTags,ApiResponse } from '@nestjs/swagger';
import { createRolesDto } from './dto/create-roles.dto';
import { updateRolesDto } from './dto/updateRoles.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Rolelar')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService:RolesService) {}

    @ApiOperation({summary:"Roleni olish"})
    @ApiResponse({status:200,type:Role})
    // @UseGuards(JwtUserAuthGuard)
    @Get(':id')
    getOne(@Param('id') id:number) {
      return this.roleService.findById(id);
    }

    @ApiOperation({summary:"Roleni o'chirish"})
    @ApiResponse({status:205,type:Role})
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.roleService.remove(id);
    }

    @ApiOperation({summary:"Roleni update qilish"})
    @ApiResponse({status:203,type:Role})
    // @UseGuards(JwtUserAuthGuard)
    @Put(':id')
    update(@Param('id') id: number, @Body() updateuser:updateRolesDto) {
      return this.roleService.update(id, updateuser);
    }

    @ApiOperation({summary:"Rolelar yaratish"})
    @ApiResponse({status:201,type:Role})
    @Post()
    create(@Body() createRoleDto:createRolesDto){
        return this.roleService.createRole(createRoleDto)
    }

    @ApiOperation({summary:"Rolelarni olish"})
    @ApiResponse({status:200,type:[Role]})
    @Get()
    getAllRoles() {
        return this.roleService.getAllRoles()
    }

    @ApiOperation({summary:"Roleni olish"})
    @ApiResponse({status:20,type:Role})
    @Get(':value')
    getByValue(@Param('value') value:string){
        return this.roleService.getRolebyValue(value)
    }
}
