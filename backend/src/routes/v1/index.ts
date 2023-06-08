import * as express from "express";
import * as helloRoutes from "./hello.route";
import * as userRoutes from "./user.route";
import * as articleRoutes from "./article.route";
const router = express.Router();

// user routes
router.use(userRoutes);

// hello routes
router.use(helloRoutes);

//article routes
router.use(articleRoutes);

export = router