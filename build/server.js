"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const indexRoutes_1 = __importDefault(require("./routes/indexRoutes"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const postsRoutes_1 = __importDefault(require("./routes/postsRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        //BBDD
        const MONGO_URI = 'mongodb://localhost/restapi';
        mongoose_1.default.set('useFindAndModify', true);
        mongoose_1.default.connect(MONGO_URI || process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useCreateIndex: true
        })
            .then(db => {
            console.log('BBDD conectada exitosamente');
        })
            .catch(err => {
            console.log('Ha ocurrido un error al conectar a la BBDD ', err);
        });
        // Setting´s server
        this.app.set('port', process.env.PORT || 3000);
        // middleware
        this.app.use(morgan_1.default('dev'));
        this.app.use(express_1.default.json()); // para que el server sepa que manipulará json
        this.app.use(express_1.default.urlencoded({ extended: false })); // esto es en caso de que la aplicacion deba soportar envios desde formularios
        this.app.use(helmet_1.default());
        this.app.use(compression_1.default()); // para enviar respuestas comprimidas al cliente
        this.app.use(cors_1.default()); // para evitar problemas de cors
    }
    routes() {
        this.app.use(indexRoutes_1.default);
        this.app.use('/api/posts', postsRoutes_1.default);
        this.app.use('/api/user', userRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Servidor corriendo en el puerto', this.app.get('port'));
        });
    }
}
const server = new Server();
server.start();
