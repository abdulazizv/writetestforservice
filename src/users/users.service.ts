import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { RolesService } from '../roles/roles.service';
import { UserRoles } from '../roles/user-roles.model';
import { ActivateUserDto } from './dto/activate-user.dto';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { createUserDto } from './dto/create-user.dto';
import { updateUserDto } from './dto/update-user.dto';
import { User } from './users.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    @InjectModel(UserRoles) private userroleRepository: typeof UserRoles,
    private readonly roleService: RolesService,
  ) {}

  async createUser(createUserDto: createUserDto) {
    const newUser = await this.userRepository.create(createUserDto);
    // const role = await this.roleService.getRolebyValue('ADMIN');
    const role = await this.roleService.getRolebyValue('USER');
    await newUser.$set('roles', [role.id]);
    // newUser.roles = [role];
    return newUser;
  }

  async update(id: number, updateuserdto: updateUserDto) {
    const user = await this.userRepository.findByPk(id);
    if (!user)
      throw new HttpException("User id noto'g'ri", HttpStatus.NOT_FOUND);
    const check = await this.userRepository.update(
      {
        name: updateuserdto.name || user.name,
        password: updateuserdto.password || user.password,
        email: updateuserdto.email || user.email,
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
      username: user.name,
    };
  }

  async getOneUser(id: number) {
    return this.userRepository.findByPk(id);
  }

  async deleteUser(id: number) {
    await this.userRepository.destroy({
      where: {
        id: id,
      },
    });
    return {
      message: 'User is deleted',
    };
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({ include: { all: true } });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.userRepository.findByPk(addRoleDto.userId);
    const role = await this.roleService.getRolebyValue(addRoleDto.value);

    if (role && user) {
      await user.$add('role', role.id);
      return addRoleDto;
    }
    throw new HttpException(
      'Foydalanuvchi yoki rol topilmadi',
      HttpStatus.NOT_FOUND,
    );
  }

  async activateUser(activateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(activateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = true;
    await user.save();
    return user;
  }

  async deactivateUser(deactivateUserDto: ActivateUserDto) {
    const user = await this.userRepository.findByPk(deactivateUserDto.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_active = false;
    await user.save();
    return user;
  }

  async banUser(banUser: BanUserDto) {
    const user = await this.userRepository.findByPk(banUser.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_ban = true;
    await user.save();
    return user;
  }

  async offBanUser(banoff: BanUserDto) {
    const user = await this.userRepository.findByPk(banoff.userId);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }
    user.is_ban = false;
    await user.save();
    return user;
  }

  async deleteValue(userId: number) {
    let valueId = 1;
    const user = await this.userroleRepository.findOne({
      where: {
        roleId: valueId,
        userId: userId,
      },
    });
    console.log(user);
    if (!user) {
      throw new HttpException(
        "Bu userga tegishli bunday value yo'q",
        HttpStatus.NOT_FOUND,
      );
    }
    const check = await this.userroleRepository.destroy({
      where: {
        roleId: valueId,
        userId: userId,
      },
    });
    if (!check)
      throw new HttpException(
        'Error has been detected during delete user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    return {
      status: 200,
      message: "User's value successfully deleted",
      data: user.userId,
    };
  }
}
