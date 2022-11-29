import { Module } from '@nestjs/common';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import {SequelizeModule} from '@nestjs/sequelize'
import { UserRoles } from './user-roles.model';
import { Role } from './roles.model'; 
import {User} from 'src/users/users.model' 
@Module({
  imports:[SequelizeModule.forFeature([Role,User,UserRoles])],
  controllers: [RolesController],
  providers: [RolesService],
  exports:[RolesService]
})
export class RolesModule {}
