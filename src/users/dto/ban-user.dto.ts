// import { ApiProperty } from "@nestjs/swagger";
// import { IsNumber } from "class-validator";

// export class ActivateUserDto {
//     @ApiProperty({example:'1',description:"Userning IDsi"})
//     @IsNumber({},{message:"UserId number bo'lishi kerak"})
//     readonly userId:number
// }

import {ApiProperty} from '@nestjs/swagger'
import {IsNumber,IsString} from 'class-validator'

export class BanUserDto {
    @ApiProperty({example:"So'kinganligi uchun",description:"Userning nima sababdan ban qilinganligi"})
    @IsString({message:"Reason string typeda bo'lishi kerak"})
    readonly reason:string;

    @ApiProperty({example:"2",description:"Userning Id si kiritiladi"})
    @IsNumber({},{message:"Id number typeda bo'lishi kerak!"})
    readonly userId:number;

    @ApiProperty({example:"30d",description:"User qancha vaqtga bloklanishi"})
    @IsString({message:"Muddati stringda bo'lishi kerak"})
    readonly period_time:string;
}