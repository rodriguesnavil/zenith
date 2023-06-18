import { ProposalModel } from "../models/proposal/proposal.model";
import { isEmpty, isNull } from "lodash";
import { proposalStatus } from "../models/proposal/schema";

export default class ProposalService {
  proposal: ProposalModel;
  constructor(proposal: ProposalModel) {
    this.proposal = proposal;
  }

  insertProposal(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let proposal: any = await this.proposal.findOne({
          proposalId: payload.proposalId,
        });
        proposal = {};
        proposal.proposalId = payload.proposalId;
        proposal.proposer = payload.proposer;
        proposal.targetContractAddress = payload.targetContractAddress;
        proposal.etherSent = payload.etherSent;
        proposal.encodedCallData = payload.encodedCallData;
        proposal.voteStart = payload.voteStart;
        proposal.voteEnd = payload.voteEnd;
        proposal.proposalDescription = payload.proposalDescription;
        proposal.created_at = payload.created_at;
        proposal.deleted = payload.deleted;
        proposal.status = proposalStatus.VOTING;
        proposal.created_at = new Date()
        proposal = await this.proposal
          .save(proposal)
          .then((savedProposal) => {
            console.log(`proposal saved succesfully:`, savedProposal);
          })
          .catch((error) => {
            console.error("Error saving proposal:", error);
          });

        return resolve(proposal);
      } catch (e) {
        return reject(e);
      }
    });
  }
  insertProposalVote(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let proposal: any = await this.proposal.findOne({
          proposalId: payload.proposalId,
        });
        if (isNull(proposal)) {
          return resolve(`No proposal with ${payload.proposalId} exsists`);
        } else {
          const newVote = {
            voter: payload.voter,
            support: payload.support,
            weight: payload.weight,
            reason: payload.reason,
          };
          proposal = await this.proposal.updateOne(
            { proposalId: payload.proposalId },
            { votes: [...proposal.votes, newVote] }
          );
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
  updateProposalStatusToQueued(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let proposal: any = await this.proposal.findOne({
          proposalId: payload.proposalId,
        });
        if (isNull(proposal)) {
          return resolve(`No proposal with ${payload.proposalId} exsists`);
        } else {
          proposal = await this.proposal.updateOne(
            { proposalId: payload.proposalId },
            { status: proposalStatus.QUEUED, eta: payload.eta }
          );
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
  updateProposalStatusToExecuted(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let proposal: any = await this.proposal.findOne({
          proposalId: payload.proposalId,
        });
        if (isNull(proposal)) {
          return resolve(`No proposal with ${payload.proposalId} exsists`);
        } else {
          proposal = await this.proposal.updateOne(
            { proposalId: payload.proposalId },
            { status: proposalStatus.EXECUTED }
          );
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
  getProposalsWithVotingStatus() {
    return new Promise(async (resolve, reject) => {
      try {
        let proposals: any = await this.proposal.find({
           status: proposalStatus.VOTING
        });
        if (isNull(proposals)) {
          return resolve(`No proposal with ${proposalStatus.VOTING} exsists`);
        } else {
         return resolve(proposals)
        }
      } catch (e) {
        return reject(e);
      }
    });
  }
}
