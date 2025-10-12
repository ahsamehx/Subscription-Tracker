import { Router } from "express";
import { deleteUser, getUser, getUsers, updateUserDetails, changePassword, changeRole} from "../controllers/user.js";
import authorize from "../Middlewares/auth.js";
import roleMiddleware from "../Middlewares/roleMiddleware.js";
const UserRouter = Router();

UserRouter.get('/', authorize, roleMiddleware("admin") ,getUsers);

UserRouter.get('/:id', authorize, roleMiddleware("admin"), getUser);

UserRouter.put('/update/', authorize, updateUserDetails);

UserRouter.put('/update/:id', authorize, roleMiddleware("admin"), updateUserDetails);

UserRouter.patch('/changePassword/:id', authorize, roleMiddleware("admin"), changePassword);

UserRouter.patch ('/changePassword/', authorize, changePassword);

UserRouter.patch('changeRole/:id', authorize, roleMiddleware("admin"), changeRole);

UserRouter.delete('/delete/:id', authorize, roleMiddleware("admin"), deleteUser);

export default UserRouter;