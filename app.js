import 'dotenv/config';
import fastify from 'fastify';
import { connectDB } from './src/config/connect.js';
import { PORT } from './src/config/config.js';
import fastifySocketIO from 'fastify-socket.io';
import { registerRoutes } from './src/routes/index.js';

const start = async () => {

    await connectDB(process.env.MONGO_URI);
    const app = fastify();

    app.register(fastifySocketIO, {
      cors:{
        origin: '*',
      },
      pingInterval:10000,
      pingTimeout:5000,
      transports: ['websocket'],
    });
    
    await registerRoutes(app);

    app.listen({port: PORT, host: '0.0.0.0'}, (err, address) => {
      if (err) {
        console.error(err);
        // process.exit(1);
      }
      console.log(`Grocery app running on http://localhost:${PORT}`);
    });

    app.ready().then(() => {
      app.io.on('connection', (socket) => {
        console.log('a user connected');

        socket.on('joinRoom', (orderId) => {
          socket.join(orderId);
          console.log(`User joined room: ${orderId}`);
        });
        

        socket.on('disconnect', () => {
          console.log('user disconnected');
        });
      });

    });

    
  
};

start();