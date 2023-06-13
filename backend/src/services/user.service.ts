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
  FUNCTION_TO_CALL,
} from "../helper-contract";

export default class UserService {
  user: UserModel;
  constructor(user: UserModel) {
    this.user = user;
  }

  upsertUser(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        // verify signed message using ethers and get address
        // const address = ethers.utils.verifyMessage(appConfig.secret, payload.signed_msg);

        // console.log(`address --> ${address}`)
        // if (!address) {
        //     return reject(new ApiError(connectionErrors.UNAUTHORIZED, 401, [{
        //         signed_msg: "is not valid"
        //     }]));
        // }
        let user: any = await this.user.findOne(
          { deleted: false, walletAddress: payload.walletAddress },
          { deleted: 0 }
        );
        if (isNull(user)) {
          user = {};
          user.firstName = payload.firstName;
          user.lastName = payload.lastName;
          user.email = payload.email;
          user.role = payload.role;
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
        console.log(`---------->${payload.reviewer} and ${FUNCTION_TO_CALL}`);
        const zenithContract = await getZenithAddressAndABI();
        const governorContract = await getGovernorContractAndABI();
        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
          FUNCTION_TO_CALL,
          [payload.reviewer]
        );
        const PROPOSAL_DESCRIPTION = `Add a reviewer ${payload.reviewer} to reviewer set!`;

        console.log(
          `Proposing ${FUNCTION_TO_CALL} on ${zenithContract.address} with ${payload.reviewer}`
        );
        console.log(`Proposal Description:\n  ${PROPOSAL_DESCRIPTION}`);
        const proposeTx = await governorContract.propose(
          [zenithContract.address],
          [0],
          [encodedFunctionCall],
          PROPOSAL_DESCRIPTION
        );
        const proposeReceipt = await proposeTx.wait(1);
        const proposalId: any = proposeReceipt.events[0].args.proposalId;
        console.log(`Proposed with proposal ID:\n  ${proposalId}`);
        return resolve(proposalId);
      } catch (e) {
        return reject(e);
      }
    });
  }
  voteReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`moving blocks`);
        console.log("Voting.....");
        const governorContract = await getGovernorContractAndABI();
        const voteTx = await governorContract.castVoteWithReason(
          payload.proposalId,
          payload.voteWay,
          payload.reason
        );
        // console.log(`-------->`)
        // const voteTxReceipt = await voteTx.wait(1)
        // console.log(`<--------`)
        const proposalState = await governorContract.state(payload.proposalId);
        console.log(`Proposal state is ${proposalState}`);
        return resolve(proposalState);
      } catch (e) {
        return reject(e);
      }
    });
  }
  executeReviewer(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.reviewer];
        const functionToCall = FUNCTION_TO_CALL;
        const PROPOSAL_DESCRIPTION = `Add a reviewer ${payload.reviewer} to reviewer set!`;
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
        console.log("Executing...");
        const executeTx = await governorContract.execute(
          [zenithContract.address],
          [0],
          [encodedFunctionCall],
          descriptionHash
        );
        const zenithNewValue = await zenithContract.getReviewerReputation(
          payload.reviewer
        );
        console.log(`reviwer reputation = ${zenithNewValue}`);
        return resolve(zenithNewValue)
      } catch (e) {
        return reject(e)
      }
    });
  }
}
