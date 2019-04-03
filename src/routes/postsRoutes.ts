import { Request, Response, Router, response } from "express";
import postModel from "../models/post";

class PostRoutes {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  async getPosts(req: Request, res: Response): Promise<void> {
    const posts = await postModel.find();
    res.json(posts);
  }

  async getPost(req: Request, res: Response): Promise<void> {
    const post = await postModel.findOne(
      { url: req.params.url },
      (err, post) => {
        if (err) console.log("Ocurrio un error ", err);
        console.log("el post encontrado es ", post);
      }
    );
    res.json(post);
  }

  async createPost(req: Request, res: Response): Promise<void> {
    const { title, url, content, image } = req.body;
    const newPost = new postModel({ title, url, content, image });
    const obj = await newPost.save();
    res.json({ msj: obj });
  }

  async updatePost(req: Request, res: Response): Promise<void> {
    const { url } = req.params;
    
    const obj_actualizado = await postModel.findOneAndUpdate({url}, req.body, {new: true});
    res.json(obj_actualizado);
  }

  async deletePost(req: Request, res: Response): Promise<void> {
    const  {url} = req.params
    const obj_elimindo = await postModel.findOneAndDelete({url});
    res.json(obj_elimindo);
    
  }

  routes() {

    this.router.get("/", this.getPosts);
    this.router.get("/:url", this.getPost);
    this.router.post("/", this.createPost);
    this.router.put("/:url", this.updatePost);
    this.router.delete("/:url", this.deletePost);
  }
}
const postRoutes = new PostRoutes();
export default postRoutes.router;
