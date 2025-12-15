# HealTogether Backend API

Express.js + Socket.io + Prisma + PostgreSQL backend for HealTogether.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
```bash
cp .env.example .env
# Edit .env with your database credentials and secrets
```

3. Set up database:
```bash
npm run prisma:migrate
npm run prisma:generate
```

4. Start development server:
```bash
npm run dev
```

Server runs on http://localhost:3001

## API Endpoints

### Authentication
- POST /api/auth/register - Register new user
- POST /api/auth/login - Login user

### Users
- GET /api/users/me - Get current user profile
- PATCH /api/users/me - Update profile

### Groups
- GET /api/groups - Get all groups
- POST /api/groups - Create group
- POST /api/groups/:id/join - Join group
- GET /api/groups/:id/posts - Get group posts
- POST /api/groups/:id/posts - Create post

### Messages
- GET /api/messages/conversations - Get all conversations
- GET /api/messages/:userId - Get messages with user
- POST /api/messages - Send message

### Buddies
- GET /api/buddies/find - Find potential buddies
- POST /api/buddies/request - Send buddy request
- PATCH /api/buddies/request/:id/accept - Accept request
- GET /api/buddies/my-buddies - Get my buddies

### Video
- POST /api/video/create-room - Create video room
- POST /api/video/room-token - Get room token

### Resources
- GET /api/resources - Get all resources
- POST /api/resources - Create resource

## Socket.io Events

### Client → Server
- join:group - Join group room
- leave:group - Leave group room
- message:send - Send message
- typing:start - Start typing
- typing:stop - Stop typing

### Server → Client
- message:new - New message received
- message:sent - Message sent confirmation
- typing:user - User is typing
- typing:stop - User stopped typing
