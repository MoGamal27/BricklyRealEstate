import { Repository } from 'typeorm';
import { Chat } from './entities/chat.entity';
import { CreateChatDto } from './dto/create-chat.dto';
export declare class ChatsService {
    private chatsRepository;
    constructor(chatsRepository: Repository<Chat>);
    create(createChatDto: CreateChatDto, buyerId: string): Promise<Chat>;
    findAll(userId: string): Promise<Chat[]>;
    findOne(id: string): Promise<Chat>;
}
