import { UsersController } from '../users.controller';
import { UsersService } from '../users.service';
import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users.model';
import { createUserDto } from '../dto/create-user.dto';
import { userStub } from './stubs/user.stub';

jest.mock('../users.service');
describe('Users controller', () => {
  let usersController: UsersController;
  let usersService: UsersService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [],
      controllers: [UsersController],
      providers: [UsersService, JwtService],
    }).compile();
    usersController = moduleRef.get<UsersController>(UsersController);
    usersService = moduleRef.get<UsersService>(UsersService);
    jest.clearAllMocks();
  });

  it('should be defined usersController', () => {
    expect(usersController).toBeDefined();
  });
  it('should be defined usersService', () => {
    expect(usersService).toBeDefined();
  });
  describe('createUser', () => {
    describe('when createUser is called', () => {
      let user: User;
      let createUsersDto: createUserDto;
      beforeEach(async () => {
        createUsersDto = {
          name: userStub().name,
          email: userStub().email,
          password: userStub().password,
        };
        user = await usersController.create(createUsersDto);
      });
      test('then it should call usersService', () => {
        expect(usersService.createUser).toHaveBeenCalledWith(createUsersDto);
      });
      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('getOneUser', () => {
    describe('when getOneUser is called', () => {
      let user: User;
      beforeEach(async () => {
        user = await usersController.getOne(userStub().id);
      });
      test('then it should call usersService', () => {
        expect(usersService.getOneUser).toBeCalledWith(userStub().id);
      });
      test('then it should return user', () => {
        expect(user).toEqual(userStub());
      });
    });
  });
  describe('getAllUser', () => {
    describe('when getAllUser is called', () => {
      let user: User[];
      let createUsersDto: createUserDto;
      beforeEach(async () => {
        user = await usersController.getAll();
      });
      test('then it should call usersService', () => {
        expect(usersService.getAllUsers).toHaveBeenCalled();
      });
      test('then it should return user[]', () => {
        expect(user).toEqual([userStub()]);
      });
    });
  });
  describe('deleteUser', () => {
    describe('when deleteUser is called', () => {
      let user: Object;
      beforeEach(async () => {
        user = await usersController.deleteUser(userStub().id);
      });
      test('then it should call deleteService', () => {
        expect(usersService.deleteUser).toBeCalledWith(userStub().id);
      });
      test('then it should return Object', () => {
        expect(user).toEqual({ message: 'User is deleted' });
      });
    });
  });
});
