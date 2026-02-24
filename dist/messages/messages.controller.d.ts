import { MessagesService } from './messages.service';
export declare class MessagesController {
    private readonly messagesService;
    constructor(messagesService: MessagesService);
    findByChatId(chatId: string): Promise<import("./entities/message.entity").Message[]>;
}
