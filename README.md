# Real Estate API - NestJS Application

A comprehensive real estate management system built with NestJS, TypeORM, PostgreSQL, and WebSocket for real-time chat functionality.

## Features

- **User Management**
  - User registration with role assignment (BUYER, SELLER, ADMIN)
  - JWT-based authentication
  - Password hashing with bcrypt
  - Role-based access control

- **Property Management**
  - CRUD operations for properties
  - Advanced search and filtering (type, price range, location, bedrooms, etc.)
  - Property status management (PENDING → APPROVED/REJECTED → SOLD)
  - View counter for property tracking
  - AI price suggestions

- **Wishlist System**
  - Add/remove properties to wishlist
  - Get user's wishlisted properties with full details

- **Booking System**
  - Schedule property viewings
  - Booking status management (PENDING, CONFIRMED, CANCELLED, COMPLETED)
  - Buyer-seller coordination

- **Real-time Chat with WebSocket**
  - WebSocket gateway for real-time messaging
  - Create chat rooms between buyers and sellers
  - Send and receive messages in real-time
  - Message history persistence
  - Typing indicators

## Technology Stack

- **Backend Framework**: NestJS
- **ORM**: TypeORM
- **Database**: PostgreSQL
- **Authentication**: JWT (JSON Web Tokens)
- **Real-time Communication**: Socket.io
- **Validation**: class-validator, class-transformer

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd real-estate-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=postgres
   DB_NAME=real_estate_db

   JWT_SECRET=your-secret-key-change-this-in-production

   PORT=3000
   ```

4. **Create PostgreSQL database**
   ```bash
   psql -U postgres
   CREATE DATABASE real_estate_db;
   \q
   ```

5. **Run the application**
   ```bash
   # Development mode with auto-reload
   npm run start:dev

   # Production mode
   npm run build
   npm run start:prod
   ```

The application will be running on `http://localhost:3000`

## Database Schema

### Entities

#### User
- id (UUID, Primary Key)
- email (String, Unique)
- password (String, Hashed)
- name (String)
- role (Enum: BUYER, SELLER, ADMIN)
- phone (String, Optional)
- createdAt (DateTime)
- updatedAt (DateTime)

#### Property
- id (UUID, Primary Key)
- title (String)
- description (Text)
- status (Enum: PENDING, APPROVED, REJECTED, SOLD)
- type (Enum: APARTMENT, VILLA, TOWNHOUSE, SINGLE_FAMILY, CONDO, DUPLEX)
- price (Integer)
- bedrooms (Integer)
- bathrooms (Integer)
- area (Integer)
- furnished (Boolean)
- level (Integer)
- compound (String)
- paymentOption (String)
- deliveryDate (DateTime)
- city (String)
- neighborhood (String)
- address (String)
- latitude (Float)
- longitude (Float)
- aiPriceSuggested (Integer, Optional)
- views (Integer, Default: 0)
- createdAt (DateTime)
- updatedAt (DateTime)
- sellerId (UUID, Foreign Key → User)

#### Wishlist
- id (UUID, Primary Key)
- createdAt (DateTime)
- userId (UUID, Foreign Key → User)
- propertyId (UUID, Foreign Key → Property)

#### Chat
- id (UUID, Primary Key)
- buyerId (UUID, Foreign Key → User)
- sellerId (UUID, Foreign Key → User)
- propertyId (UUID, Foreign Key → Property)

#### Message
- id (UUID, Primary Key)
- content (Text)
- senderId (UUID, Foreign Key → User)
- chatId (UUID, Foreign Key → Chat)
- createdAt (DateTime)
- updatedAt (DateTime)

#### Booking
- id (UUID, Primary Key)
- date (DateTime)
- time (String)
- status (Enum: PENDING, CONFIRMED, CANCELLED, COMPLETED)
- notes (Text, Optional)
- createdAt (DateTime)
- updatedAt (DateTime)
- buyerId (UUID, Foreign Key → User)
- propertyId (UUID, Foreign Key → Property)

### Relationships

- User → Property (One-to-Many: Seller)
- User → Wishlist (One-to-Many)
- Property → Wishlist (One-to-Many)
- User → Chat (Many-to-Many through buyerId/sellerId)
- Chat → Message (One-to-Many)
- User → Booking (One-to-Many: Buyer)
- Property → Booking (One-to-Many)

## API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/auth/register` | Register new user | No |
| POST | `/auth/login` | Login user | No |
| GET | `/auth/refresh` | Refresh access token | Yes |

### Users

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/users/profile` | Get current user profile | Yes | All |
| PUT | `/users/profile` | Update current user profile | Yes | All |
| GET | `/users` | Get all users | Yes | ADMIN |
| DELETE | `/users/:id` | Delete user | Yes | ADMIN |

### Properties

| Method | Endpoint | Description | Auth Required | Roles |
|--------|----------|-------------|---------------|-------|
| GET | `/properties` | Get all properties with filters | No | All |
| GET | `/properties/:id` | Get property by ID | No | All |
| POST | `/properties` | Create property | Yes | SELLER, ADMIN |
| PUT | `/properties/:id` | Update property | Yes | SELLER, ADMIN |
| DELETE | `/properties/:id` | Delete property | Yes | SELLER, ADMIN |
| PUT | `/properties/:id/status` | Update property status | Yes | ADMIN |

#### Property Filters
- `type`: PropertyType (APARTMENT, VILLA, etc.)
- `status`: PropertyStatus (PENDING, APPROVED, etc.)
- `minPrice`: Minimum price
- `maxPrice`: Maximum price
- `bedrooms`: Number of bedrooms
- `bathrooms`: Number of bathrooms
- `furnished`: Boolean
- `city`: City name
- `neighborhood`: Neighborhood name
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Wishlists

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/wishlists` | Get user's wishlist | Yes |
| POST | `/wishlists/:propertyId` | Add property to wishlist | Yes |
| DELETE | `/wishlists/:propertyId` | Remove property from wishlist | Yes |

### Bookings

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/bookings` | Get user's bookings | Yes |
| GET | `/bookings/:id` | Get booking by ID | Yes |
| POST | `/bookings` | Create booking | Yes |
| PUT | `/bookings/:id/status` | Update booking status | Yes |

### Chats

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/chats` | Get user's chats | Yes |
| GET | `/chats/:id` | Get chat by ID | Yes |
| POST | `/chats` | Create/Start new chat | Yes |
| GET | `/chats/:chatId/messages` | Get chat messages | Yes |

## WebSocket Events

### Client → Server

| Event | Payload | Description |
|-------|---------|-------------|
| `join_chat` | `{ chatId: string, userId: string }` | Join a chat room |
| `leave_chat` | `{ chatId: string, userId: string }` | Leave a chat room |
| `send_message` | `{ content: string, chatId: string, senderId: string }` | Send a message |
| `typing` | `{ chatId: string, userId: string, isTyping: boolean }` | Typing indicator |

### Server → Client

| Event | Payload | Description |
|-------|---------|-------------|
| `joined_chat` | `{ chatId: string }` | Confirmation of joining chat |
| `left_chat` | `{ chatId: string }` | Confirmation of leaving chat |
| `receive_message` | `Message object` | Receive new message |
| `message_sent` | `Message object` | Confirmation of sent message |
| `user_typing` | `{ userId: string, isTyping: boolean }` | Another user is typing |

## WebSocket Connection Example

### JavaScript Client
```javascript
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

// Join a chat
socket.emit('join_chat', {
  chatId: 'chat-id-here',
  userId: 'user-id-here'
});

// Send a message
socket.emit('send_message', {
  content: 'Hello!',
  chatId: 'chat-id-here',
  senderId: 'user-id-here'
});

// Listen for messages
socket.on('receive_message', (message) => {
  console.log('New message:', message);
});

// Send typing indicator
socket.emit('typing', {
  chatId: 'chat-id-here',
  userId: 'user-id-here',
  isTyping: true
});

// Listen for typing indicators
socket.on('user_typing', (data) => {
  console.log(`User ${data.userId} is typing:`, data.isTyping);
});
```

## Postman Collection

Import the `postman_collection.json` file into Postman to test all API endpoints.

The collection includes:
- Pre-configured environment variables
- Auto-save of authentication tokens
- All API endpoints with example requests
- WebSocket connection examples

### Using the Postman Collection

1. Import `postman_collection.json` into Postman
2. Start with the "Register Buyer" or "Login" request
3. The access token will be automatically saved for subsequent requests
4. Test other endpoints in order

## Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── dto/                # Data Transfer Objects
│   ├── strategies/         # Passport strategies
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   └── auth.module.ts
├── users/                  # Users module
│   ├── entities/          # User entity
│   ├── dto/               # Data Transfer Objects
│   ├── users.controller.ts
│   ├── users.service.ts
│   └── users.module.ts
├── properties/            # Properties module
│   ├── entities/         # Property entity
│   ├── dto/              # Data Transfer Objects
│   ├── properties.controller.ts
│   ├── properties.service.ts
│   └── properties.module.ts
├── wishlists/            # Wishlists module
│   ├── entities/        # Wishlist entity
│   ├── wishlists.controller.ts
│   ├── wishlists.service.ts
│   └── wishlists.module.ts
├── bookings/            # Bookings module
│   ├── entities/       # Booking entity
│   ├── dto/            # Data Transfer Objects
│   ├── bookings.controller.ts
│   ├── bookings.service.ts
│   └── bookings.module.ts
├── chats/              # Chats module
│   ├── entities/      # Chat entity
│   ├── dto/           # Data Transfer Objects
│   ├── chats.controller.ts
│   ├── chats.service.ts
│   └── chats.module.ts
├── messages/          # Messages module
│   ├── entities/     # Message entity
│   ├── dto/          # Data Transfer Objects
│   ├── messages.controller.ts
│   ├── messages.service.ts
│   └── messages.module.ts
├── websocket/        # WebSocket module
│   ├── chat.gateway.ts
│   └── websocket.module.ts
├── common/           # Shared resources
│   ├── decorators/  # Custom decorators
│   ├── guards/      # Auth guards
│   ├── filters/     # Exception filters
│   ├── pipes/       # Validation pipes
│   └── enums/       # Enums
├── app.module.ts    # Root module
└── main.ts          # Application entry point
```

## Available Scripts

```bash
# Development
npm run start:dev      # Start in development mode with watch
npm run start:debug    # Start in debug mode

# Production
npm run build         # Build the application
npm run start:prod    # Start in production mode

# Formatting
npm run format        # Format code with Prettier
```

## Security Features

- Password hashing with bcrypt
- JWT-based authentication
- Role-based access control (RBAC)
- Input validation with class-validator
- Global exception filter
- Protected routes with guards

## Error Handling

The API uses standard HTTP status codes:

- `200 OK`: Successful GET request
- `201 Created`: Successful POST request
- `400 Bad Request`: Invalid input
- `401 Unauthorized`: Missing or invalid authentication
- `403 Forbidden`: Insufficient permissions
- `404 Not Found`: Resource not found
- `409 Conflict`: Duplicate resource
- `500 Internal Server Error`: Server error

## Environment Variables

Required environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| DB_HOST | PostgreSQL host | localhost |
| DB_PORT | PostgreSQL port | 5432 |
| DB_USERNAME | Database username | postgres |
| DB_PASSWORD | Database password | postgres |
| DB_NAME | Database name | real_estate_db |
| JWT_SECRET | JWT secret key | your-secret-key |
| PORT | Application port | 3000 |

## Testing

The application includes setup for unit and e2e testing:

```bash
npm run test         # Run unit tests
npm run test:watch   # Run tests in watch mode
npm run test:cov     # Generate coverage report
npm run test:e2e     # Run end-to-end tests
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@realestate-api.com or open an issue in the repository.
