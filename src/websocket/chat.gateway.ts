import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesService } from '../messages/messages.service';
import { CreateMessageDto } from '../messages/dto/create-message.dto';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join_chat')
  handleJoinChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string },
  ) {
    client.join(data.chatId);
    console.log(`User ${data.userId} joined chat ${data.chatId}`);
    return { event: 'joined_chat', data: { chatId: data.chatId } };
  }

  @SubscribeMessage('leave_chat')
  handleLeaveChat(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string },
  ) {
    client.leave(data.chatId);
    console.log(`User ${data.userId} left chat ${data.chatId}`);
    return { event: 'left_chat', data: { chatId: data.chatId } };
  }

  @SubscribeMessage('send_message')
  async handleSendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody()
    data: {
      content: string;
      chatId: string;
      senderId: string;
    },
  ) {
    const createMessageDto: CreateMessageDto = {
      content: data.content,
      chatId: data.chatId,
    };

    const message = await this.messagesService.create(
      createMessageDto,
      data.senderId,
    );

    this.server.to(data.chatId).emit('receive_message', message);

    return { event: 'message_sent', data: message };
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { chatId: string; userId: string; isTyping: boolean },
  ) {
    client.to(data.chatId).emit('user_typing', {
      userId: data.userId,
      isTyping: data.isTyping,
    });
  }
}
