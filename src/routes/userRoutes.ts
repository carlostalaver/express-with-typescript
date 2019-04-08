import { Request, Response, Router, response } from "express";
import userModel from "../models/user";

class UserRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getUsers(req: Request, res: Response): Promise<void> {
    const users = await userModel.find();
    res.json(users);
  }

  async getUser(req: Request, res: Response) {
    console.log('obteniendo un user dpor user name ', req.params.username);
    
    const user = await userModel.findOne({ username: req.params.username},
      (err, user) => {
        if (err) console.log("Ocurrio un error ", err);
        console.log("el post encontrado es ", user);
      }
    ).populate('posts', 'title url content'); // posts  es el nombre del Schema en user.ts 
                                              // 'title url content' son los datos que necesito, si no establezco nada regresará todo
    res.json(user);                           // 'campo1 campo2 ... campon' separados por espacios, para que no muestre el _id se coloca 'campo1 campo2 -_id ... campoN'
  }

  async createUser(req: Request, res: Response): Promise<void> {
    const { name, email, password, username} = req.body;
    const newUser = new userModel({ name, email, password, username});
    const obj = await newUser.save();
    res.json({ msj: obj });
  }

  async updateUser(req: Request, res: Response): Promise<void> {
    const { username } = req.params;
    
    const obj_actualizado = await userModel.findOneAndUpdate({username}, req.body, {new: true});
    res.json(obj_actualizado);
  }

  async deleteUser(req: Request, res: Response): Promise<void> {
    const  {username} = req.params
    const obj_elimindo = await userModel.findOneAndDelete({username});
    res.json(obj_elimindo);
    
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
export default userRoutes.router;
