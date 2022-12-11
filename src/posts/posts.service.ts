import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from 'src/files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private readonly fileService: FilesService,
  ) {}
  async create(createPostDto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const post = await this.postRepository.create({
      ...createPostDto,
      image: fileName,
    });
    return post;
  }

  async getAll(): Promise<Post[]> {
    return this.postRepository.findAll();
  }

  async getOne(id: number): Promise<Post> {
    return this.postRepository.findByPk(id);
  }

  async update(id: number, updatePostDto: UpdatePostDto, image: any) {
    const post = await this.postRepository.findByPk(id);
    if (!post)
      throw new HttpException("Post id noto'g'ri", HttpStatus.NOT_FOUND);
    let fileName: string;
    if (image) {
      const isExists = await this.fileService.deleteFile(post.image);
      if (!isExists) {
        throw new HttpException(
          'File is not found such as file',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    fileName = await this.fileService.createFile(image);
    const check = await this.postRepository.update(
      {
        title: updatePostDto.title || post.title,
        content: updatePostDto.content || post.content,
        userId: updatePostDto.userId || post.userId,
        image: fileName,
      },
      {
        where: {
          id: id,
        },
      },
    );
    if (!check)
      throw new HttpException('Updateda error bermoqda!', HttpStatus.NOT_FOUND);
    return {
      status: 200,
      message: 'User is updated',
      username: post.title,
    };
  }

  async delete(id: number) {
    return this.postRepository.destroy({
      where: {
        id: id,
      },
    });
  }
}
