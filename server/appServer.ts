import express, { Express } from "express";
import path from "path";
import http from "http";
import { Server, Socket } from "socket.io";

export class AppServer {

  private readonly app: Express;

  private readonly server: http.Server;

  private io: Server;

  private sockets: Map<string, Socket[]>;

  constructor() {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);
    this.sockets = new Map<string, Socket[]>();

    this.app.use(express.json());
// Serve the React static files after build
    this.app.use(express.static(path.resolve("./") + "/build/client"));

    this.app.get("/api/hello", (req, res) => {
      res.send({ message: "Hello" });
    });

    this.subscribeSocket()

// All other unmatched requests will return the React app
    this.app.get("/", (req, res) => {
      res.sendFile(path.resolve("./") + "/build/client/index.html");
    });
  }

  start(port: number) {
    this.server.listen(port, () => {
      console.log('Server listening on *:',port);
    });
  }

  subscribeSocket() {
    this.io.on('connection', (socket) => {
      const pianoSockets = this.getSockets('1');
      pianoSockets.push(socket);
      socket
        .on('disconnect', () => {
          const pianoSockets = this.getSockets('1', socket);
          this.sockets.set('1',pianoSockets);
        })
        .on('play', this.playNote(socket))
        .on('stop', this.stopNote(socket));
    }).on('disconnect', (socket) => {
    })

  }

  private playNote = (userSocket: Socket) => (pianoNumber: string, note: string) => {
    this.getSockets(pianoNumber, userSocket).forEach(socket => socket.emit('playNote', note));
  }
  private stopNote = (userSocket: Socket) => (pianoNumber: string, note: string) => {
    this.getSockets(pianoNumber, userSocket).forEach(socket => socket.emit('stopNote', note));
  }

  private getSockets(pianoNumber: string, userSocket: Socket = null): Socket[] {
    let sockets = this.sockets.get(pianoNumber);
    if (!sockets) {
      this.sockets.set(pianoNumber, []);
      sockets = this.sockets.get(pianoNumber);
    }
    if (userSocket) {
      return sockets.filter(socket => socket !== userSocket);
    } else {
      return sockets;
    }
  }

}
