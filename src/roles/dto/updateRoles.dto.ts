import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class updateRolesDto {
    @ApiProperty({example:'USER',description:"Value user yoki admin beriladi"})
    // @IsString({message:"Value string bo'lishi kerak"})
    readonly value:string;
    @ApiProperty({example:"User faqat get qiladi",description:"Descriptionda imkoniyatlar yoziladi"})
    // @IsString({message:"Description string bo'lishi kerak"})
    readonly description:string
}