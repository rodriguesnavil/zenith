import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertArticle,proposeArticle, voteArticle, queueArticle, executeArticle} from './../../controllers/v1/article.controller'
import {globals} from './../../constants'
//import uploadArticle from "../../middlewares/uploadArticle"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})


//router.post('/article', uploadArticle, insertArticle);
router.post('/article', insertArticle);
router.post('/article/propose',  proposeArticle);
router.post('/article/vote',  voteArticle);
router.post('/article/queue',  queueArticle);
router.post('/article/execute',  executeArticle);



export = router;
