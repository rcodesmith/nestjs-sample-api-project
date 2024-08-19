import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @ApiProperty({ example: 1, description: 'The unique identifier of the user' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: "John Doe", description: 'The name of the user' })
  @Column()
  name: string;

  @ApiProperty({ example: "john@some.com", description: 'The email of the user' })
  @Column()
  email: string;

}
