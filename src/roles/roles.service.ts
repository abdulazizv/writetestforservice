import { Injectable,HttpException,HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { createRolesDto } from './dto/create-roles.dto';
import { updateRolesDto } from './dto/updateRoles.dto';
import { Role } from './roles.model';

@Injectable()
export class RolesService {
    constructor(@InjectModel(Role) private roleRepository:typeof Role) {}

    async update(id:number,updateroleDto:updateRolesDto){
        const role = await this.roleRepository.findByPk(id)
        if(!role) throw new HttpException("Role id noto'g'ri",HttpStatus.NOT_FOUND)
        const check = await this.roleRepository.update({value:updateroleDto.value || role.value,description:updateroleDto.description || role.description},{where:{
          id:id
        }})
        if(!check) throw new HttpException("Updateda error bermoqda!",HttpStatus.NOT_FOUND)
        return {
          status:200,
          message:"Role is updated",
          value:role.value
        }
      }
    
      async findById(id:number){
        return this.roleRepository.findByPk(id)
      }
    
      async remove(id: number){
        await this.roleRepository.destroy({where:{
          id:id
        }});
        return {
          status:200,
          message:'Role is deleted',
          userId:id
        }
      }
    
    async createRole(createRoleDto:createRolesDto) {
        const newRole = await this.roleRepository.create(createRoleDto)
        return newRole
    }

    async getRolebyValue(value:string){
        const role = await this.roleRepository.findOne({where:{value}})
        return role
    }

    async getAllRoles() {
        const roles = await this.roleRepository.findAll({include:{all:true}})
        return roles
    }
}
