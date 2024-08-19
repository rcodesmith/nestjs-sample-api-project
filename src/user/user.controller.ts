import { ClassSerializerInterceptor, Controller, Get, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseInterceptors(ClassSerializerInterceptor)
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }
  
}
