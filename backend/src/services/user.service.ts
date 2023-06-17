import { UserModel, User } from "../models/user/user.model";
import { ApiError } from "../commons/APIError";
import { connectionErrors } from "../constants";
import { isEmpty, isNull } from "lodash";
import { appConfig } from "../config";
import { ethers } from "ethers";
import * as jwt from "jsonwebtoken";
import {
  getZenithAddressAndABI,
  getGovernorContractAndABI,
  FUNCTION_TO_CALL_Reviewer,
} from "../helper-contract";

export default class UserService {
  user: UserModel;
  constructor(user: UserModel) {
    this.user = user;
  }

  upsertUser(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let user: any = await this.user.findOne(
          { deleted: false, walletAddress: payload.walletAddress },
          { deleted: 0 }
        );
        console.log(`user ${JSON.stringify(user)}`);
        if (isNull(user)) {
          user = {};
          user.firstName = payload.firstName;
          user.lastName = payload.lastName;
          user.email = payload.email;
          user.walletAddress = payload.walletAddress;
          user.created_at = new Date();
          user = await this.user.save(user);
        }
        return resolve(user);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getUser(walletAddress: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let user: any = await this.user.findOne(
          { deleted: false, walletAddress },
          { deleted: 0 }
        );
        if (isNull(user)) {
          return resolve(null);
        }
        return resolve(user);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getReviewers() {
    return new Promise(async (resolve, reject) => {
      try {
        const query = { role: "reviewer" };
        let reviewers: any = await this.user.find(query);
        return resolve(reviewers);
      } catch (e) {
        return reject(e);
      }
    });
  }

  proposeReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`proposing ${payload.reviewer} and ${FUNCTION_TO_CALL_Reviewer}`);
        const zenithContract = await getZenithAddressAndABI();
        const governorContract = await getGovernorContractAndABI();
        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
            FUNCTION_TO_CALL_Reviewer,
          [payload.reviewer]
        );
        const PROPOSAL_DESCRIPTION = payload.description;
        console.log(
          `Proposing ${FUNCTION_TO_CALL_Reviewer} on ${zenithContract.address} with ${payload.reviewer}`
        );
        const proposeTx = await governorContract.propose(
          [zenithContract.address],
          [0],
          [encodedFunctionCall],
          PROPOSAL_DESCRIPTION
        );
        
        const proposeTxReceipt = await proposeTx.wait(1);
        const proposalId: any = proposeTxReceipt.events[0].args.proposalId;
        console.log(`Proposed with proposal ID:\n  ${proposalId}`);
        return resolve(proposalId.toString());
      } catch (e) {
        return reject(e);
      }
    });
  }
  voteReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log("Voting.....");
        const governorContract = await getGovernorContractAndABI();
        let proposalState = await governorContract.state(payload.proposalId);
        console.log(`Proposal state before vote is ${proposalState}`);
        const voteTx = await governorContract.castVoteWithReason(
          payload.proposalId,
          payload.voteWay,
          payload.reason
        );
        const voteTxReceipt = await voteTx.wait(1)
        proposalState = await governorContract.state(payload.proposalId);
        console.log(`Proposal state after vote is ${proposalState}`);
        return resolve(proposalState);
      } catch (e) {
        return reject(e);
      }
    });
  }
  queueReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.reviewer];
        const functionToCall = FUNCTION_TO_CALL_Reviewer;
        const PROPOSAL_DESCRIPTION = payload.description;
        const zenithContract = await getZenithAddressAndABI();
        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
          functionToCall,
          args
        );
        const descriptionHash = ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
        );
        const governorContract = await getGovernorContractAndABI();
        console.log("Queueing...");
        const queueTx = await governorContract.queue(
          [zenithContract.address],
          [0],
          [encodedFunctionCall],
          descriptionHash
        );
        const queueTxReceipt = await queueTx.wait(1)
        return resolve("success");
      } catch (e) {
        return reject(e);
      }
    });
  }

  executeReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.reviewer];
        const functionToCall = FUNCTION_TO_CALL_Reviewer;
        const zenithContract = await getZenithAddressAndABI();
        const governorContract = await getGovernorContractAndABI();
        const PROPOSAL_DESCRIPTION = payload.description;

        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
          functionToCall,
          args
        );
        const descriptionHash = ethers.utils.keccak256(
          ethers.utils.toUtf8Bytes(PROPOSAL_DESCRIPTION)
        );
        console.log("Executing...");
        const executeTx = await governorContract.execute(
          [zenithContract.address],
          [0],
          [encodedFunctionCall],
          descriptionHash
        );
        const executeTxReceipt = await executeTx.wait(1)
        const reviewerRep = await zenithContract.getReviewerReputation(
          payload.reviewer
        );
        console.log(`Reviewer = ${payload.reviewer} and Reputation is = ${reviewerRep}`);
        return resolve(reviewerRep);
      } catch (e) {
        return reject(e);
      }
    });
  }
}
