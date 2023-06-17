import * as express from 'express';
import * as Joi from "joi";
import {insertCommnet,getComment,getArticleComments} from "../../controllers/v1/comment.controller"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

router.post('/comment/insertComment',insertCommnet)
router.get('/comment/getComment/:commentId', getComment)
router.get('/comment/getArticleComments/:articleId',getArticleComments )

export = router;
