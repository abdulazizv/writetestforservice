import { ApiProperty } from '@nestjs/swagger';
import {Table,Model,Column,BelongsToMany,HasMany,DataType} from 'sequelize-typescript'
import { User } from 'src/users/users.model';
import { UserRoles } from './user-roles.model';

interface RoleCreationAttrs {
    value:string;
    description:string;
}

@Table({tableName:'roles'})
export class Role extends Model<Role,RoleCreationAttrs> {
    @ApiProperty({example:'1',description:"Unikal id"})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:'Admin',description:"Rolening valuesi. Null bo'lishi mumkin emas!Unique bo'ladi"})
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    value:string;
    @ApiProperty({example:'POST,DELETE,GET',description:"Roles descriptioni"})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    description:string;

    @BelongsToMany(()=>User,()=>UserRoles)
    users:User[]
    
}