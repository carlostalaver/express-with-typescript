"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_1 = __importDefault(require("../models/user"));
class UserRoutes {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield user_1.default.find();
            res.json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('obteniendo un user dpor user name ', req.params.username);
            const user = yield user_1.default.findOne({ username: req.params.username }, (err, user) => {
                if (err)
                    console.log("Ocurrio un error ", err);
                console.log("el post encontrado es ", user);
            }).populate('posts', 'title url content'); // posts  es el nombre del Schema en user.ts 
            // 'title url content' son los datos que necesito, si no establezco nada regresará todo
            res.json(user); // 'campo1 campo2 ... campon' separados por espacios, para que no muestre el _id se coloca 'campo1 campo2 -_id ... campoN'
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, username } = req.body;
            const newUser = new user_1.default({ name, email, password, username });
            const obj = yield newUser.save();
            res.json({ msj: obj });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const obj_actualizado = yield user_1.default.findOneAndUpdate({ username }, req.body, { new: true });
            res.json(obj_actualizado);
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const obj_elimindo = yield user_1.default.findOneAndDelete({ username });
            res.json(obj_elimindo);
        });
    }
    routes() {
        this.router.get("/", this.getUsers);
        this.router.get("/:username", this.getUser);
        this.router.post("/", this.createUser);
        this.router.put("/:username", this.updateUser);
        this.router.delete("/:username", this.deleteUser);
    }
}
const userRoutes = new UserRoutes();
exports.default = userRoutes.router;
