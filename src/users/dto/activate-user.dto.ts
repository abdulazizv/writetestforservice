import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class ActivateUserDto {
    @ApiProperty({example:'1',description:"Userning IDsi"})
    @IsNumber({},{message:"UserId number bo'lishi kerak"})
    readonly userId:number
}