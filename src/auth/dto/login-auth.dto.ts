import { ApiProperty } from "@nestjs/swagger";
import {IsEmail,IsString,MinLength} from 'class-validator'
export class  AuthDto {
    @ApiProperty({example:'user1@gmail.com',description:'Foydalanuvchi elektron pochtasi'})
    @IsString({message:"Email string bo'lishi kerak"})
    @IsEmail({},{message:"No'to'g'ri email kiritilgan"})
    readonly email:string;
    @ApiProperty({example:'12345',description:'Foydalanuvchi paroli'})
    @IsString({message:"Parol string bo'lishi kerak"})
    @MinLength(4,{message:"Parol kamida 4ta belgidan iborat bo'ladi"})
    readonly password:string;
}