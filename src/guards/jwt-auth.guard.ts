import { Injectable,CanActivate, ExecutionContext,UnauthorizedException} from "@nestjs/common";
import {JwtService} from '@nestjs/jwt'
import { Observable } from "rxjs";
@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService:JwtService){ }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            console.log("Auth")
            const req = context.switchToHttp().getRequest()
            const authHeader = req.headers.authorization
            const bearer = authHeader.split(' ')[0]
            const token = authHeader.split(' ')[1]
            if(bearer !== "Bearer" || !token) {
                throw new UnauthorizedException({
                    message:"Foydalanuvchi avtorizatsiyadan o'tmagan"
                })
            }
            const user = this.jwtService.verify(token)  
            console.log(user)
            req.user = user
            return true
        } catch (error) {
            console.log(error)
            throw new UnauthorizedException({
                message:"Foydalanuvchi avtorizatsiyadan o'tmagan"
            })
        }
    }
}