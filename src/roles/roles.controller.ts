import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiTags,ApiResponse } from '@nestjs/swagger';
import { createRolesDto } from './dto/create-roles.dto';
import { Role } from './roles.model';
import { RolesService } from './roles.service';

@ApiTags('Rolelar')
@Controller('roles')
export class RolesController {
    constructor(private readonly roleService:RolesService) {}

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
