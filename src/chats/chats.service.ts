import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat)
    private chatsRepository: Repository<Chat>,
  ) {}

  async create(createChatDto: CreateChatDto, buyerId: string) {
    const existingChat = await this.chatsRepository.findOne({
      where: {
        buyerId,
        sellerId: createChatDto.sellerId,
        propertyId: createChatDto.propertyId,
      },
    });

    if (existingChat) {
      return existingChat;
    }

    const chat = this.chatsRepository.create({
      ...createChatDto,
      buyerId,
    });

    return await this.chatsRepository.save(chat);
  }

  async findAll(userId: string) {
    return await this.chatsRepository
      .createQueryBuilder('chat')
      .leftJoinAndSelect('chat.buyer', 'buyer')
      .leftJoinAndSelect('chat.seller', 'seller')
      .leftJoinAndSelect('chat.property', 'property')
      .where('chat.buyerId = :userId OR chat.sellerId = :userId', { userId })
      .getMany();
  }

  async findOne(id: string) {
    const chat = await this.chatsRepository.findOne({
      where: { id },
      relations: ['buyer', 'seller', 'property'],
    });

    if (!chat) {
      throw new NotFoundException('Chat not found');
    }

    return chat;
  }
}
