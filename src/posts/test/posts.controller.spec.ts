import { Test } from '@nestjs/testing';
import { PostsController } from '../posts.controller';
import { PostsService } from '../posts.service';
import { postStub } from './stubs/post.stub';
import { User } from '../../users/users.model';
import { getModelToken } from '@nestjs/sequelize';
import { Role } from '../../roles/roles.model';
import { Post } from '../posts.model';
import { CreatePostDto } from '../dto/create-post.dto';
import { UpdatePostDto } from '../dto/update-post-dto';

jest.mock('../posts.service');
describe('Posts controller', () => {
  let postsController: PostsController;
  let postsService: PostsService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: {
            create: jest.fn().mockResolvedValue(postStub()),
            getAll: jest.fn().mockResolvedValue([postStub()]),
            getOne: jest.fn().mockResolvedValue(postStub()),
            delete: jest.fn().mockResolvedValue(true),
            update: jest.fn().mockResolvedValue(postStub()),
          },
        },
        {
          provide: getModelToken(User),
          useValue: {},
        },
        {
          provide: getModelToken(Role),
          useValue: {},
        },
      ],
    }).compile();
    postsController = moduleRef.get<PostsController>(PostsController);
    postsService = moduleRef.get<PostsService>(PostsService);
    jest.clearAllMocks();
  });
  it('should be defined postsController', () => {
    expect(postsController).toBeDefined();
  });
  it('should be defined postsService', () => {
    expect(postsService).toBeDefined();
  });
  describe('createPost', () => {
    describe('when createPost is called', () => {
      let post: Post;
      let createPostDto: CreatePostDto;
      let image: any;
      beforeEach(async () => {
        createPostDto = {
          title: postStub().title,
          content: postStub().content,
          userId: postStub().userId,
        };
        image = 'image.png';
        post = await postsController.create(createPostDto, image);
      });

      test('then it should call postService', () => {
        expect(postsService.create).toBeCalledWith(createPostDto, image);
      });
      test('then it should return post', () => {
        expect(post).toEqual(postStub());
      });
    });
  });
  describe('getAllPosts', () => {
    describe('when getAll called', () => {
      let post: Post[];
      beforeEach(async () => {
        post = await postsController.getAll();
      });
      test('then it should call postService', () => {
        expect(postsService.getAll).toHaveBeenCalledWith();
      });
      test('then it should return post', () => {
        expect(post).toEqual([postStub()]);
      });
    });
  });
  describe('getOnePosts', () => {
    describe('when getOne is called', () => {
      let post: Post;
      beforeEach(async () => {
        post = await postsController.getOne(postStub().id);
      });
      test('then it should call postService', () => {
        expect(postsService.getOne).toBeCalledWith(postStub().id);
      });
      test('then it should return post', () => {
        expect(post).toEqual(postStub());
      });
    });
  });
  describe('deletePost', () => {
    describe('when delete is called', () => {
      let post: Boolean;
      beforeEach(async () => {
        post = await postsController.delete(postStub().id);
      });
      test('then it should call postsService', () => {
        expect(postsService.delete).toBeCalledWith(postStub().id);
      });
      test('then it should return boolean', () => {
        expect(post).toEqual(true);
      });
    });
  });
  describe('updatePost', () => {
    describe('when update is called', () => {
      let post: Post;
      let image;
      let updatePostDto: UpdatePostDto;
      beforeEach(async () => {
        updatePostDto = {
          title: postStub().title,
          content: postStub().content,
          userId: postStub().userId,
        };
        image = 'image.png';
        post = await postsController.update(
          postStub().id,
          updatePostDto,
          image,
        );
      });
      test('then it should call postsService', () => {
        expect(postsService.update).toHaveBeenCalledWith(
          postStub().id,
          updatePostDto,
          image,
        );
      });
      test('then it should return object', () => {
        expect(post).toEqual(postStub());
      });
    });
  });
});
