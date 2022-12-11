import { IsString } from "class-validator";

export class UpdatePostDto {
    // @IsString()
    readonly title:string;
    // @IsString()
    readonly content:string;
    // @IsString()
    readonly userId:number;
}