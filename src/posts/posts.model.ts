import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from '../users/users.model';

interface PostcreationAttrs {
  title: string;
  content: string;
  image: string;
  userId: number;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostcreationAttrs> {
  @ApiProperty({ example: '1', description: 'Unikal Id' })
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;
  @ApiProperty({ example: 'Post1', description: 'Maqola sarlavhasi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;
  @ApiProperty({
    example: 'Bu yerda maqola matni boladi',
    description: 'Maqola matni',
  })
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  content: string;
  @ApiProperty({ example: 'rasm', description: 'Maqola rasmi' })
  @Column({
    type: DataType.STRING,
  })
  image: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  userId: number;

  @BelongsTo(() => User)
  author: User;
}
