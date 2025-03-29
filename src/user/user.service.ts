import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';


let USERS = [
  {
    id: 1,
    name: "JOSE",
    lastname: "PEPE",
    age: 20
  },
  {
    id: 2,
    name: "JORDAN",
    lastname: "KEP",
    age: 18
  },
  {
    id: 3,
    name: "SUSAN",
    lastname: "HOP",
    age: 30
  }
]

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {

    const newUSER = {
      id: Math.random(),
      ...createUserDto
    }

    USERS.push(newUSER)

    return USERS;
  }

  findAll() {
    return USERS;
  }

  findOne(id: number) {
    return USERS.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {

    const findUser = USERS.find(i => i.id === id)

    updateUserDto.age && (findUser.age = updateUserDto.age)
    updateUserDto.name && (findUser.name = updateUserDto.name)
    updateUserDto.lastname && (findUser.lastname = updateUserDto.lastname)

    return USERS
  }

  remove(id: number) {
    USERS = USERS.filter(user => user.id !== id);
    return USERS;
  }
}
