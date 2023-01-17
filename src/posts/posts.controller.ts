import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post-dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(@Body() createPostDto: CreatePostDto, @UploadedFile() image) {
    return this.postService.create(createPostDto, image);
  }

  @Get()
  getAll() {
    return this.postService.getAll();
  }

  // @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.postService.getOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updatepostDto: UpdatePostDto,
    @UploadedFile() image,
  ) {
    return this.postService.update(id, updatepostDto, image);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.postService.delete(id);
  }
}
