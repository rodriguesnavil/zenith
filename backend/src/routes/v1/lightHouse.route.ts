import * as express from 'express';
import * as Joi from "joi";
import {uploadVolume} from "../../controllers/v1/lighthouse.controller"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

router.post('/uploadVolume', uploadVolume)

export = router;
