# Quick Start Guide

This guide will help you get the Real Estate API up and running in minutes.

## Prerequisites

- Node.js v18+ installed
- PostgreSQL v12+ installed and running
- npm or yarn package manager

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Database

### Create PostgreSQL Database

```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE real_estate_db;

# Exit psql
\q
```

## Step 3: Configure Environment

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=real_estate_db

JWT_SECRET=your-super-secret-jwt-key-change-in-production

PORT=3000
```

**Important**: Change the `JWT_SECRET` to a strong, random string in production!

## Step 4: Start the Application

### Development Mode (with auto-reload)
```bash
npm run start:dev
```

### Production Mode
```bash
npm run build
npm run start:prod
```

The server will start on `http://localhost:3000`

## Step 5: Test the API

### Option 1: Using Postman

1. Import the `postman_collection.json` file into Postman
2. Run the "Register Buyer" request to create a user
3. The access token will be automatically saved
4. Test other endpoints

### Option 2: Using curl

**Register a user:**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123",
    "name": "Test User",
    "role": "BUYER"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
```

Save the `access_token` from the response.

**Get Profile:**
```bash
curl -X GET http://localhost:3000/users/profile \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## Step 6: Test WebSocket Chat

Create a simple HTML file to test WebSocket:

```html
<!DOCTYPE html>
<html>
<head>
  <title>Chat Test</title>
  <script src="https://cdn.socket.io/4.6.0/socket.io.min.js"></script>
</head>
<body>
  <h1>Chat Test</h1>
  <div id="messages"></div>
  <input type="text" id="chatId" placeholder="Chat ID">
  <input type="text" id="userId" placeholder="User ID">
  <button onclick="joinChat()">Join Chat</button>
  <br><br>
  <input type="text" id="messageInput" placeholder="Message">
  <button onclick="sendMessage()">Send</button>

  <script>
    const socket = io('http://localhost:3000');
    let currentChatId = '';
    let currentUserId = '';

    socket.on('connect', () => {
      document.getElementById('messages').innerHTML += '<p>Connected to server</p>';
    });

    socket.on('receive_message', (msg) => {
      document.getElementById('messages').innerHTML +=
        `<p><strong>${msg.senderId}:</strong> ${msg.content}</p>`;
    });

    function joinChat() {
      currentChatId = document.getElementById('chatId').value;
      currentUserId = document.getElementById('userId').value;
      socket.emit('join_chat', { chatId: currentChatId, userId: currentUserId });
    }

    function sendMessage() {
      const content = document.getElementById('messageInput').value;
      socket.emit('send_message', {
        content,
        chatId: currentChatId,
        senderId: currentUserId
      });
      document.getElementById('messageInput').value = '';
    }
  </script>
</body>
</html>
```

## Common Issues and Solutions

### Issue: "Cannot connect to database"

**Solution:**
- Verify PostgreSQL is running: `pg_isready`
- Check database credentials in `.env`
- Ensure database exists: `psql -U postgres -l`

### Issue: "Port 3000 already in use"

**Solution:**
- Change the PORT in `.env` to another port (e.g., 3001)
- Or stop the process using port 3000:
  ```bash
  # Find process
  lsof -i :3000
  # Kill process
  kill -9 <PID>
  ```

### Issue: "JWT must be provided"

**Solution:**
- Ensure you're including the Authorization header
- Format: `Authorization: Bearer YOUR_TOKEN`
- Get a new token by logging in

### Issue: "Synchronize is not recommended in production"

**Solution:**
- Set `synchronize: false` in `app.module.ts`
- Use TypeORM migrations for production

## Database Schema

The application will automatically create tables on first run (synchronize: true).

Tables created:
- users
- properties
- wishlists
- chats
- messages
- bookings

## Next Steps

1. **Read the Full Documentation**: Check `README.md` for detailed API documentation
2. **Explore WebSocket**: Read `WEBSOCKET_GUIDE.md` for real-time chat implementation
3. **Test with Postman**: Import and run the complete Postman collection
4. **Build Your Frontend**: Use the API to build a web or mobile application

## Example Workflow

### Complete User Journey

1. **Register a Seller**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "seller@example.com",
    "password": "password123",
    "name": "Property Seller",
    "role": "SELLER"
  }'
```

2. **Seller Creates a Property**
```bash
curl -X POST http://localhost:3000/properties \
  -H "Authorization: Bearer SELLER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Beautiful Villa",
    "description": "A stunning villa with ocean view",
    "type": "VILLA",
    "price": 1500000,
    "bedrooms": 4,
    "bathrooms": 3,
    "area": 3000,
    "furnished": true,
    "level": 2,
    "compound": "Ocean View Residences",
    "paymentOption": "Cash",
    "deliveryDate": "2024-12-31",
    "city": "Dubai",
    "neighborhood": "Jumeirah",
    "address": "123 Beach Road",
    "latitude": 25.2048,
    "longitude": 55.2708
  }'
```

3. **Register a Buyer**
```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "buyer@example.com",
    "password": "password123",
    "name": "Property Buyer",
    "role": "BUYER"
  }'
```

4. **Buyer Searches for Properties**
```bash
curl -X GET "http://localhost:3000/properties?type=VILLA&city=Dubai&maxPrice=2000000"
```

5. **Buyer Adds to Wishlist**
```bash
curl -X POST http://localhost:3000/wishlists/PROPERTY_ID \
  -H "Authorization: Bearer BUYER_TOKEN"
```

6. **Buyer Books a Viewing**
```bash
curl -X POST http://localhost:3000/bookings \
  -H "Authorization: Bearer BUYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "date": "2024-12-15",
    "time": "14:00",
    "notes": "Looking forward to viewing",
    "propertyId": "PROPERTY_ID"
  }'
```

7. **Buyer Starts a Chat**
```bash
curl -X POST http://localhost:3000/chats \
  -H "Authorization: Bearer BUYER_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "sellerId": "SELLER_ID",
    "propertyId": "PROPERTY_ID"
  }'
```

## Production Deployment

Before deploying to production:

1. **Disable synchronize**
   - Set `synchronize: false` in TypeORM config
   - Use migrations instead

2. **Set strong JWT secret**
   - Generate a secure random string
   - Store in environment variables

3. **Enable HTTPS**
   - Use a reverse proxy (nginx, Apache)
   - Get SSL certificate (Let's Encrypt)

4. **Set up monitoring**
   - Add logging (Winston, Pino)
   - Set up error tracking (Sentry)
   - Monitor performance

5. **Database optimization**
   - Add indexes to frequently queried columns
   - Set up connection pooling
   - Regular backups

## Support

For issues or questions:
- Check the main `README.md`
- Read the `WEBSOCKET_GUIDE.md` for chat functionality
- Open an issue on GitHub

Happy coding!
