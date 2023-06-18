import * as express from 'express';
import * as Joi from "joi";
import {getProposalsWithVotingStatus} from "../../controllers/v1/proposal.controller"

const router = express.Router();

const UserDTO = Joi.object({
    signed_msg:  Joi.string().required(),
})

router.get('/proposal/getProposalsWithVotingStatus',getProposalsWithVotingStatus)


export = router;
