import { Router } from "express";
import { getUser, getUsers} from "../controllers/user.js";
import authorize from "../Middlewares/auth.js";
const UserRouter = Router();

UserRouter.get('/', authorize, getUsers);

UserRouter.get('/:id', authorize, getUser);

UserRouter.post('/', (req, res) => {
  res.send({title : "Create new user"});
});

UserRouter.put('/:id', (req, res) => {
  res.send({title : "Update user details"});
});

UserRouter.delete('/:id', (req, res) => {
  res.send({title : "Delete a user"});
});

export default UserRouter;