import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
      ) {}
    
      findAll(): Promise<Post[]> {
        return this.postRepository.find();
      }
    
      async findOne(id: number): Promise<Post> {
        const post = await this.postRepository.findOne({ where: { id } });
        if (!post) {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
        return post;
      }
    
      create(post: Post): Promise<Post> {
        return this.postRepository.save(post);
      }
    
      async update(id: number, post: Post): Promise<Post> {
        await this.postRepository.update(id, post);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        const result = await this.postRepository.delete(id);
        if(result.affected === 0) {
          throw new NotFoundException(`Post with id ${id} not found`);
        }
      }
}
