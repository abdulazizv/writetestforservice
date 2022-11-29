import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
    @ApiProperty({example:'ADMIN',description:"Value admin bo'lishi kerak !"})
    @IsString({message:"Value string bo'lishi kerak"})
    readonly value:string;
    @ApiProperty({example:'1',description:"Userning idsi"})
    @IsNumber({},{message:"Id number bo'lishi kerak"})
    readonly userId:number;
}