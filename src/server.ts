import express from 'express';
import morgan from 'morgan';
import helmet = require('helmet');
import mongoose from 'mongoose';
import indexRoutes from './routes/indexRoutes';
import compression from 'compression';
import cors from 'cors';
import postRoutes from './routes/postsRoutes';
import userRoutes from './routes/userRoutes';


class Server {
   app: express.Application;

  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }
  
  config() {
    //BBDD
      const MONGO_URI = 'mongodb://localhost/restapi';
      mongoose.set('useFindAndModify', true)
      mongoose.connect( MONGO_URI || process.env.MONGODB_URL, {
        useNewUrlParser: true, 
        useCreateIndex: true
      })
      .then( db => {
        console.log('BBDD conectada exitosamente');
      })
      .catch( err =>{
        console.log('Ha ocurrido un error al conectar a la BBDD ', err);
      })

    // Setting´s server
      this.app.set('port', process.env.PORT || 3000);
    // middleware
      this.app.use(morgan('dev'));
      this.app.use(express.json()); // para que el server sepa que manipulará json
      this.app.use(express.urlencoded({extended: false})) // esto es en caso de que la aplicacion deba soportar envios desde formularios
      this.app.use(helmet());
      this.app.use(compression()); // para enviar respuestas comprimidas al cliente
      this.app.use(cors()); // para evitar problemas de cors
  }

  routes() {
    this.app.use(indexRoutes);  
    this.app.use('/api/posts',postRoutes)
    this.app.use('/api/user', userRoutes)

  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log( 'Servidor corriendo en el puerto', this.app.get('port'));
      
    })
  }
}

const server = new Server();
server.start();