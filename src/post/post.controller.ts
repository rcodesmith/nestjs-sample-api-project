import { Controller, Get, Post, Put, Delete, Body, Param, HttpCode } from '@nestjs/common';
import { PostService } from './post.service';
import { Post as PostEntity } from './post.entity';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, description: 'Return all posts.', type: [PostEntity] })
  findAll(): Promise<PostEntity[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a post by id' })
  @ApiResponse({ status: 200, description: 'Return a post.', type: PostEntity })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id') id: string): Promise<PostEntity> {
    return this.postService.findOne(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiResponse({ status: 201, description: 'The post has been successfully created.', type: Post })
  create(@Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.create(post);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing post given an id' })
  @ApiResponse({ status: 200, description: 'The post has been successfully updated.', type: PostEntity })  
  @ApiResponse({ status: 404, description: 'Post not found.' })
  update(@Param('id') id: string, @Body() post: PostEntity): Promise<PostEntity> {
    return this.postService.update(+id, post);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiResponse({ status: 200, description: 'The user has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(+id);
  }
}