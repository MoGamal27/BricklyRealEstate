"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const chat_entity_1 = require("./entities/chat.entity");
let ChatsService = class ChatsService {
    constructor(chatsRepository) {
        this.chatsRepository = chatsRepository;
    }
    async create(createChatDto, buyerId) {
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
    async findAll(userId) {
        return await this.chatsRepository
            .createQueryBuilder('chat')
            .leftJoinAndSelect('chat.buyer', 'buyer')
            .leftJoinAndSelect('chat.seller', 'seller')
            .leftJoinAndSelect('chat.property', 'property')
            .where('chat.buyerId = :userId OR chat.sellerId = :userId', { userId })
            .getMany();
    }
    async findOne(id) {
        const chat = await this.chatsRepository.findOne({
            where: { id },
            relations: ['buyer', 'seller', 'property'],
        });
        if (!chat) {
            throw new common_1.NotFoundException('Chat not found');
        }
        return chat;
    }
};
exports.ChatsService = ChatsService;
exports.ChatsService = ChatsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(chat_entity_1.Chat)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ChatsService);
//# sourceMappingURL=chats.service.js.map