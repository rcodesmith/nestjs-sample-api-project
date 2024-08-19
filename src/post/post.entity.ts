import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Post {
  @ApiProperty({ example: 1, description: 'The unique identifier of the post' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "My first post", description: 'The title of the post'})
  @Column()
  title: string;

  @ApiProperty({ example: "My post content", description: 'The content of the post'})
  @Column()
  content: string;

  @ApiProperty({ example: 1, description: 'The user ID of the post author' })
  @Column()
  user_id: number;
}
