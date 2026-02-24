import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly messagesService;
    server: Server;
    constructor(messagesService: MessagesService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleJoinChat(client: Socket, data: {
        chatId: string;
        userId: string;
    }): {
        event: string;
        data: {
            chatId: string;
        };
    };
    handleLeaveChat(client: Socket, data: {
        chatId: string;
        userId: string;
    }): {
        event: string;
        data: {
            chatId: string;
        };
    };
    handleSendMessage(client: Socket, data: {
        content: string;
        chatId: string;
        senderId: string;
    }): Promise<{
        event: string;
        data: import("../messages/entities/message.entity").Message;
    }>;
    handleTyping(client: Socket, data: {
        chatId: string;
        userId: string;
        isTyping: boolean;
    }): void;
}
