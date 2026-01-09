# Real-Time WebSocket Engine

[![Node.js](https://img.shields.io/badge/Node.js-v18+-339933?logo=node.js&logoColor=white)](https://nodejs.org/)
[![Socket.IO](https://img.shields.io/badge/Socket.IO-v4.8-010101?logo=socket.io&logoColor=white)](https://socket.io/)
[![WebSockets](https://img.shields.io/badge/WebSockets-RFC_6455-00599C?logo=websocket&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

> **Real-time multiplayer engine** demonstrating bidirectional WebSocket communication for low-latency state synchronization.

## 👥 Project Context

**Collaborative Team Project** developed by a team of 5 developers using **Agile Scrum methodology**. Project management and task coordination were handled through **GitHub Projects**, enabling efficient sprint planning, backlog management, and cross-functional collaboration.

## 🎯 Core Features

- **WebSocket Communication**: Persistent connections for sub-100ms latency
- **Event-Driven Architecture**: Server-authoritative state management
- **Room-Based Broadcasting**: Efficient multi-client synchronization

## 🏗️ Architecture

**WebSocket Flow**: `Client Event → Server Validation → State Update → Broadcast to Room`

```mermaid
sequenceDiagram
    participant C1 as Client 1
    participant WS as WebSocket Server
    participant C2 as Client 2

    C1->>WS: connect()
    C2->>WS: connect()
    
    C1->>WS: emit('createGame')
    C2->>WS: emit('createGame')
    WS-->>C1: emit('gameCreated', roomId)
    WS-->>C2: emit('gameCreated', roomId)
    
    C1->>WS: emit('attack', data)
    WS->>WS: Update State
    WS-->>C1: emit('updateGameState', newState)
    WS-->>C2: emit('updateGameState', newState)
```

**Why WebSockets?**
- **Persistent Connection**: No HTTP handshake overhead per message
- **Bidirectional**: Server can push updates without client polling
- **Low Latency**: ~10-50ms vs ~100-300ms for HTTP requests

## 🔧 Technical Implementation

The engine implements server-side event handling for room-based matchmaking and state synchronization. Client-side WebSocket connections listen for state updates and emit player actions to the server. All game logic and validation occur server-side to ensure consistency across connected clients.

## 💡 Key Challenges Solved

**1. Disconnect Handling**
- Automatic room cleanup on disconnect
- State garbage collection prevents memory leaks

**2. State Synchronization**
- Server-authoritative model prevents client manipulation
- Atomic state updates ensure consistency

**3. Latency Optimization**
- Minimal payload sizes
- Event-driven updates (no polling)

## 🚀 Getting Started

```bash
# Clone repository
git clone https://github.com/Gh0stbasta/bloodKatana.git
cd bloodKatana

# Install dependencies
npm install

# Start server
npm run dev
```

**Testing Multiplayer**: Open `http://localhost:3000` in two browser windows to test real-time synchronization.

## 📊 Tech Stack

**Backend**: Node.js, Express, Socket.IO  
**Frontend**: Vanilla JavaScript, Socket.IO Client  
**Protocol**: WebSocket (RFC 6455)

---

**Built to demonstrate WebSocket-based real-time state synchronization patterns.**
