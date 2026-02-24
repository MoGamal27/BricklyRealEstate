import { ChatsService } from './chats.service';
import { CreateChatDto } from './dto/create-chat.dto';
export declare class ChatsController {
    private readonly chatsService;
    constructor(chatsService: ChatsService);
    findAll(user: any): Promise<import("./entities/chat.entity").Chat[]>;
    findOne(id: string): Promise<import("./entities/chat.entity").Chat>;
    create(createChatDto: CreateChatDto, user: any): Promise<import("./entities/chat.entity").Chat>;
}
