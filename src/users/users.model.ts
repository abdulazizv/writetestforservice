import { ApiProperty } from '@nestjs/swagger';
import {Table,Model,Column,BelongsToMany,HasMany,DataType} from 'sequelize-typescript'
import { Role } from 'src/roles/roles.model';
import { UserRoles } from 'src/roles/user-roles.model';

interface UserCreationAttrs {
email:string;
    password:string;
}

@Table({tableName:'users'})
export class User extends Model<User,UserCreationAttrs> {
    @ApiProperty({example:'1',description:'Unikal Id'})
    @Column({
        type:DataType.INTEGER,
        unique:true,
        autoIncrement:true,
        primaryKey:true
    })
    id:number;

    @ApiProperty({example:'User1',description:'Foydalanuvchi ismi. Ism null bolishi mumkinmas'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    name:string;

    @ApiProperty({example:'User1@gmail.com',description:'Foydalanuvchi emaili. Unique boladi va null bolishi mumkinmas.'})
    @Column({
        type:DataType.STRING,
        unique:true,
        allowNull:false
    })
    email:string;

    @ApiProperty({example:'qwerty',description:"Foydalanuvchi passwordi. Null bo'lishi mumkin emas."})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    password:string;
    
    @ApiProperty({example:'true',description:"Aktiv foydalanuvchiligi true yoki false"})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_active:boolean;
    
    @BelongsToMany(()=>Role,() =>UserRoles)
    roles:Role[]
}