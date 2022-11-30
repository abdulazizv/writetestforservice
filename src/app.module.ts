import { Module } from '@nestjs/common';
import {ConfigModule} from '@nestjs/config'
import {SequelizeModule} from '@nestjs/sequelize'
import { User } from './users/users.model';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { UserRoles } from './roles/user-roles.model';
import { Role } from './roles/roles.model';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from '@nestjs/serve-static'
import {resolve} from 'path'
import { Post } from './posts/posts.model';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:`.${process.env.NODE_ENV}.env`
    }),
    ServeStaticModule.forRoot({
      rootPath:resolve(__dirname,'static')
    }),
    SequelizeModule.forRoot({
      dialect:'postgres',
      host:process.env.POSTGRES_HOST,
      port:Number(process.env.POSTGRES_PORT),
      username:process.env.POSTGRES_USER,
      password:process.env.POSTGRES_PASSWORD,
      database:process.env.POSTGRES_DB ,
      models:[User,Role,UserRoles,Post],
      autoLoadModels:true,
      logging:false
    }),
    UsersModule,
    RolesModule,
    UserRoles,
    AuthModule,
    PostsModule,
    FilesModule
  ]
})
export class AppModule {}
