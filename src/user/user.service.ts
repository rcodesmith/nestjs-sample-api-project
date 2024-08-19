import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>    
    ) {

    }

    findAll(): Promise<User[]> {
        return this.userRepository.find();
      }
    
      async findOne(id: number): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
          }
          return user;
      }
    
      create(user: User): Promise<User> {
        return this.userRepository.save(user);
      }
    
      async update(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return this.findOne(id);
      }
    
      async remove(id: number): Promise<void> {
        const result = await this.userRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
      }
    
}
