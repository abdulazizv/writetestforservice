import { forwardRef, Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { FilesModule } from 'src/files/files.module';
import { User } from 'src/users/users.model';
import { Post } from './posts.model';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    SequelizeModule.forFeature([User, Post]),
    FilesModule,
    forwardRef(() => UsersModule),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
