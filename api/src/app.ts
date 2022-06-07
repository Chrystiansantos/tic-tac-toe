import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { Server } from 'socket.io'
import http from 'http'

import { routes } from './routes/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes)

const serverHttp = http.createServer(app);
const io = new Server(serverHttp, {
  cors: {
    origin: '*'
  }
})

io.on('connection', (socket) => {
  console.log('Usuario conectado no socket', socket.id)
})

export { serverHttp, io }
