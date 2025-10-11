import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUserDetails} from "../controllers/user.js";
import authorize from "../Middlewares/auth.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
const UserRouter = Router();

UserRouter.get('/', authorize, roleMiddleware("admin") ,getUsers);

UserRouter.get('/:id', authorize, roleMiddleware("admin"), getUser);

UserRouter.put('/update/', authorize, updateUserDetails);

UserRouter.put('/update/:id', authorize, roleMiddleware("admin"), updateUserDetails);

UserRouter.delete('/:id', authorize, roleMiddleware("admin"), deleteUser);

export default UserRouter;