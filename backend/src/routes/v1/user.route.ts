import * as express from 'express';
import validateRequest = require("../../middlewares/validateSchema");
import * as Joi from "joi";
import {insertUser, getUser, getReviewers,proposeReviewer,voteReviewer, queueReviewer, executeReviewer} from './../../controllers/v1/user.controller'
import {globals} from './../../constants'

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

//router.post('/user', validateRequest(UserDTO), loginUser);
router.post('/user', insertUser);
router.get('/user/:walletAddress', getUser);
router.get('/reviewers',getReviewers);
router.post('/reviewers/propose',proposeReviewer)
router.post('/reviewers/vote',voteReviewer)
router.post('/reviewers/queue',queueReviewer)
router.post('/reviewers/execute',executeReviewer)


export = router;
