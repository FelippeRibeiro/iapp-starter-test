import { Socket, Server as SocketIOServer } from 'socket.io';
import http from 'http';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

import { Conversation } from '../models/Conversation';

type IConnections = {
  socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  messags: string[];
};
let connections: IConnections[] = [];
export function initializeSocket(server: http.Server) {
  const io = new SocketIOServer(server);

  io.on('connection', (client) => {
    console.log('New Connection!', client.id);
    if (!client.handshake.query.name) {
      client.disconnect();
      return;
    }
    connections.forEach((c) => {
      if (c.socket.handshake.query.name === client.handshake.query.name) {
        connections = connections.filter((c) => c.socket.handshake.query.name !== client.handshake.query.name);
      }
    });
    connections.push({ messags: [], socket: client });

    client.on('disconnect', () => {
      console.log('User disconnected!');
      connections = connections.filter((c) => c.socket.id !== client.id);
      io.emit(
        'refreshConnection',
        connections.map((c) => c.socket.handshake.query.name || c.socket.id)
      );
    });

    client.on('message', async (message: { from: string; to: string; message: string }) => {
      if (!message.from || !message.to || !message.message) return;
      if (message.from.length < 1 || message.to.length < 1 || message.message.length < 1) return;

      let conversa = await Conversation.findOne({ authors: { $all: [message.from, message.to] } });

      if (!conversa) {
        conversa = await Conversation.create({
          authors: [message.from, message.to],
          messages: [],
        });
      }

      conversa.messages.push({
        author: message.from,
        message: message.message,
        time: Date.now().toString(),
      });

      connections.forEach((c) => {
        if ((c.socket.handshake.query.name || c.socket.id) === message.to) {
          c.socket.emit('direct', { from: message.from, message: message.message });
        }
      });
      await conversa.save();
    });

    client.on('history', async (data: { author1: string; author2: string }) => {
      if (!data.author1 || !data.author2) return;

      if (data.author1.length < 1 || data.author2.length < 1) return;
      let conversa = await Conversation.findOne({ authors: { $all: [data.author1, data.author2] } });
      if (!conversa) return;
      client.emit('resultHistory', conversa.messages);
    });

    ///

    io.emit(
      'refreshConnection',
      connections.map((c) => c.socket.handshake.query.name || c.socket.id)
    );
  });
}
