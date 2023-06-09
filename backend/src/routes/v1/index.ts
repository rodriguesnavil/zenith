import * as express from "express";
import * as helloRoutes from "./hello.route";
import * as userRoutes from "./user.route";
import * as articleRoutes from "./article.route";
import * as makeDealRoutes from "./makeDeal.route"
import * as lighthouseRoutes from "./lightHouse.route"
import * as commentRoutes from "./comment.route"
import * as proposalRoutes from "./proposal.route"
const router = express.Router();

// user routes
router.use(userRoutes);

// hello routes
router.use(helloRoutes);

//article routes
router.use(articleRoutes);

//makedeal routes
router.use(makeDealRoutes)

//lighthouse routes
router.use(lighthouseRoutes)

//comment routes
router.use(commentRoutes)

//proposal routes
router.use(proposalRoutes)
export = router