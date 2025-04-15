import { Injectable } from '@nestjs/common';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProfileService {

  constructor(private readonly prisma: PrismaService) { }

  async create(createProfileDto: CreateProfileDto) {
    try {
      const profile = await this.prisma.profile.create({
        data: {
          bio: createProfileDto.bio,
          user: {
            connect: {
              id: createProfileDto.userId,
            },
          }
        },
      });

      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async findAll() {
    try {
      return await this.prisma.profile.findMany();
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id: number) {
    try {
      return await this.prisma.profile.findUnique({
        where: {
          id: id,
        },
      })
    } catch (error) {
      console.log(error);
    }
  }

  async update(id: number, updateProfileDto: UpdateProfileDto) {
    try {
      const profile = await this.prisma.profile.update({
        where: {
          id: id,
        },
        data: {
          bio: updateProfileDto.bio,
        },
      });

      return profile;
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.profile.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
