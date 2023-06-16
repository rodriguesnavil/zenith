import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {makeDeal} from './../../controllers/v1/makedeal.controller'
import {globals} from './../../constants'
//import uploadArticle from "../../middlewares/uploadArticle"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

router.post('/makeDeal',  makeDeal);



export = router;