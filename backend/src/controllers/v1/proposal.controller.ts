import { Request, Response, NextFunction } from "express";
import ProposalService from "../../services/proposal.service";
import { ProposalModel } from "../../models/proposal/proposal.model";

const getProposalsWithVotingStatus = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    let articleService = new ProposalService(new ProposalModel());
    try {
      
      let response = await articleService.getProposalsWithVotingStatus();
      return res.send({
        success: true,
        data: {
          response,
        },
      });
    } catch (e) {
        console.log(e);
        return next(e);
      }
    };

    export {getProposalsWithVotingStatus}