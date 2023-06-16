import { ArticleModel, Article } from "../models/article/article.model";
import { ApiError } from "../commons/APIError";
import { connectionErrors } from "../constants";
import { isEmpty, isNull } from "lodash";
import { appConfig } from "../config";
import { ethers } from "ethers";

import * as jwt from "jsonwebtoken";
import {
    getZenithAddressAndABI,
    getGovernorContractAndABI,
    FUNCTION_TO_CALL_Article,
  } from "../helper-contract";
import { articleStatus } from "../models/article/schema";
  

export default class ArticleService {
    article: ArticleModel
    constructor(article: ArticleModel) {
        this.article = article;
    }

    upsertArticle(payload: any) {
        return new Promise(async (resolve, reject) => {
            try {
                let article: any = await this.article.findOne( {title:payload.title, status: payload.status}, );
                if (isNull(article)) {
                    article = {};
                    article.title = payload.title;
                    article.status = articleStatus.SUBMITTED;
                    article.created_at = new Date();
                    article.authors = payload.authors;
                    //article.file = file;
                    article = await this.article.save(article);
                    
                }
                return resolve(article);
            } catch (e) {
                return reject(e)
            }
        })
    }

  proposeArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`proposing ${payload.articleId} and ${FUNCTION_TO_CALL_Article}`);
        const zenithContract = await getZenithAddressAndABI();
        const governorContract = await getGovernorContractAndABI();
        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
            FUNCTION_TO_CALL_Article,
            [payload.articleId]
        );
        const PROPOSAL_DESCRIPTION = payload.description;
        console.log(
          `Proposing ${FUNCTION_TO_CALL_Article} on ${zenithContract.address} with ${payload.articleId}`
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
  voteArticle(payload: any) {
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
  queueArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.articleId];
        const functionToCall = FUNCTION_TO_CALL_Article;
        const PROPOSAL_DESCRIPTION = payload.description
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

  executeArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.articleId];
        const functionToCall = FUNCTION_TO_CALL_Article;
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
        const isArticlePublished = await zenithContract.isArticlePublished(
          payload.articleId
        );
        console.log(`Article ID = ${payload.articleId} and Article status = ${isArticlePublished}`);
        return resolve(isArticlePublished);
      } catch (e) {
        return reject(e);
      }
    });
  }
}
