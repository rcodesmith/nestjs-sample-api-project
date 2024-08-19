import { Body, ClassSerializerInterceptor, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @Get()
    @ApiOperation({ summary: 'Get all users' })
    @ApiResponse({ status: 200, description: 'Return all users.', type: [User] })  
    findAll(): Promise<User[]> {
      return this.userService.findAll();
    }
  
    @Get(':id')
    @ApiOperation({ summary: 'Get a user by id' })
    @ApiResponse({ status: 200, description: 'Return a user.', type: User })
    @ApiResponse({ status: 404, description: 'User not found.' })
    findOne(@Param('id') id: string): Promise<User> {
      return this.userService.findOne(+id);
    }
  
    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'The user has been successfully created.', type: User })  
    create(@Body() user: User): Promise<User> {
      return this.userService.create(user);
    }
  
    @Put(':id')
    @ApiOperation({ summary: 'Update an existing user given an id' })
    @ApiResponse({ status: 200, description: 'The user has been successfully updated.', type: User })  
    @ApiResponse({ status: 404, description: 'User not found.' })
    update(@Param('id') id: string, @Body() user: User): Promise<User> {
      return this.userService.update(+id, user);
    }
  
    @Delete(':id')
    @HttpCode(204)
    @ApiOperation({ summary: 'Delete an existing user given an id' })
    @ApiResponse({ status: 204, description: 'The user has been successfully deleted.', type: User })  
    @ApiResponse({ status: 404, description: 'User not found.' })
    remove(@Param('id') id: string): Promise<void> {
      return this.userService.remove(+id);
    }
    
}
