import * as express from "express";
import * as helloRoutes from "./hello.route";
import * as userRoutes from "./user.route";
const router = express.Router();

// user routes
router.use(userRoutes);

// hello routes
router.use(helloRoutes);

export = router