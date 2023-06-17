import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertArticle,getAllArtilces, getArticle, proposeArticle, voteArticle, queueArticle, executeArticle} from './../../controllers/v1/article.controller'
import {globals} from './../../constants'
//import uploadArticle from "../../middlewares/uploadArticle"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})


//router.post('/article', uploadArticle, insertArticle);
router.post('/article', insertArticle);
router.get('/article/:articleId',getArticle)
router.get('/getAllArticles', getAllArtilces);
router.post('/article/propose',  proposeArticle);
router.post('/article/vote',  voteArticle);
router.post('/article/queue',  queueArticle);
router.post('/article/execute',  executeArticle);



export = router;
