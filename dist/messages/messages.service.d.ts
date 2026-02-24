import { Repository } from 'typeorm';
import { Message } from './entities/message.entity';
import { CreateMessageDto } from './dto/create-message.dto';
export declare class MessagesService {
    private messagesRepository;
    constructor(messagesRepository: Repository<Message>);
    create(createMessageDto: CreateMessageDto, senderId: string): Promise<Message>;
    findByChatId(chatId: string): Promise<Message[]>;
}
