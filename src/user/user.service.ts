import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    return await this.prisma.user.create({
      data: createUserDto
    })
  }

  async findAll() {
    return await this.prisma.user.findMany(
      {
        include: {
          profile: true
        }
      }
    );
  }

  async findOne(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id
      },
      include: {
        profile: true
      }
    })
  }

  async update(id: number, updateUserDto: UpdateUserDto) {

    const findUser = await this.findOne(id);

    if (!findUser) {
      throw new NotFoundException('User not found');
    }

    const user = await this.prisma.user.update({
      where: {
        id
      },
      data: updateUserDto,
      include: {
        profile: true
      }
    })

    return user;
  }

  async remove(id: number) {
    return await this.prisma.user.delete({
      where: {
        id
      }
    })
  }
}
