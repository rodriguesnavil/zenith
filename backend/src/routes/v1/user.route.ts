import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertUser} from './../../controllers/v1/user.controller'
import {globals} from './../../constants'

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

//router.post('/user', validateRequest(UserDTO), loginUser);
router.post('/user', insertUser);

export = router;
