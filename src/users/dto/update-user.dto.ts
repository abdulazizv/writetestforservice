import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class updateUserDto {
    @ApiProperty({example:'User1',description:"Foydalanuvchi ismi"})
    // @IsString({message:"Ismi string bo'lishi kerak!"})
    readonly name:string;
    @ApiProperty({example:'user1@gmail.com',description:"Foydalanuvchi @ emaili"})
    // @IsString({message:"Email string bo'lishi kerak"})
    // @IsEmail({},{message:"No'tog'ri email kiritilgan"})
    readonly email:string;
    @ApiProperty({example:'12345',description:'Foydalanuvchi passwordi'})
    // @IsString({message:"Parol string bo'lishi kerak!"})
    // @MinLength(4,{message:"Parol kamida 4 belgidan iborat bo'lishi kerak!"})
    readonly password:string;
}