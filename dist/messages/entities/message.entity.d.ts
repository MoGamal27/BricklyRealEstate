import { User } from '../../users/entities/user.entity';
import { Chat } from '../../chats/entities/chat.entity';
export declare class Message {
    id: string;
    content: string;
    senderId: string;
    chatId: string;
    createdAt: Date;
    updatedAt: Date;
    sender: User;
    chat: Chat;
}
