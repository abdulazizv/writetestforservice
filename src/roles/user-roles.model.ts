import {Table,Model,Column,BelongsToMany,HasMany,ForeignKey,DataType} from 'sequelize-typescript'
import { User } from 'src/users/users.model';
import { Role } from './roles.model';

interface RoleCreationAttrs {
    value:string;
    description:string;
}

@Table({tableName:'user_roles',createdAt:false,updatedAt:false})
export class UserRoles extends Model<UserRoles> {
    // @ApiProperty
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    

    @ForeignKey(()=>User)
    @Column({type:DataType.INTEGER})
    userId:number

    @ForeignKey(()=>Role)
    @Column({type:DataType.INTEGER})
    roleId:number    
}