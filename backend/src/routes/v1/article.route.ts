import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertArticle} from './../../controllers/v1/article.controller'
import {globals} from './../../constants'

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})


router.post('/article',  insertArticle);


export = router;
