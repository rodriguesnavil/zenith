import { ArticleModel, Article } from "../models/article/article.model";
import { ApiError } from "../commons/APIError";
import { connectionErrors } from "../constants";
import { isEmpty, isNull } from "lodash";
import { appConfig } from "../config";
import { ethers } from "ethers";
import * as jwt from "jsonwebtoken";

import { articleStatus } from "../models/article/schema";

import {
  getZenithAddressAndABI,
  getGovernorContractAndABI,
  FUNCTION_TO_CALL_Article,
} from "../helper-contract";

export default class ArticleService {
  article: ArticleModel;
  constructor(article: ArticleModel) {
    this.article = article;
  }

  upsertArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let article: any = await this.article.findOne({
          title: payload.title,
          deleted: false,
        });

        console.log(`here `);
        const { name: filename, content: path } = payload.file;

        console.log(`name ${filename} path ${path}`);

        if (!article) {
          article = {
            title: payload.title,
            status: "SUBMITTED", // Replace with your actual status enum or constant
            walletAddresses: payload.walletAddresses,
            created_at: new Date(),
            filename: payload.file.name,
            filePath: payload.file.filePath,
            fileType: payload.file.type,
            extension: payload.file.extension,
          };
          article = await this.article.save(article);
        }
        return resolve(article);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getAllArticles() {
    return new Promise(async (resolve, reject) => {
      try {
        let articles: any = await this.article.find({ deleted: false });
        return resolve(articles);
      } catch (e) {
        return reject(e);
      }
    });
  }
  getArticle(id: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let article: any = await this.article.findById(id);
        return resolve(article);
      } catch (e) {
        return reject(e);
      }
    });
  }
  proposeArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(
          `proposing ${payload.articleId} and ${FUNCTION_TO_CALL_Article}`
        );
        const zenithContract = await getZenithAddressAndABI();
        const governorContract = await getGovernorContractAndABI();
        const encodedFunctionCall = zenithContract.interface.encodeFunctionData(
          FUNCTION_TO_CALL_Article,
          [payload.payloadCID,payload.authorWalletAddress]
        );
        const PROPOSAL_DESCRIPTION = payload.description;
        console.log(
          `Proposing ${FUNCTION_TO_CALL_Article} on ${zenithContract.address} with ${payload.articleId}, ${payload.payloadCID} and ${payload.authorWalletAddress}`
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
        const voteTxReceipt = await voteTx.wait(1);
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
        const args = [payload.payloadCID,payload.authorWalletAddress]
        const functionToCall = FUNCTION_TO_CALL_Article;
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
        const queueTxReceipt = await queueTx.wait(1);
        return resolve("success");
      } catch (e) {
        return reject(e);
      }
    });
  }

  executeArticle(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        const args = [payload.payloadCID,payload.authorWalletAddress]
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
        const executeTxReceipt = await executeTx.wait(1);
        let tokenId: any = executeTxReceipt.logs[1].topics[3].toString()
        return resolve(tokenId);
      } catch (e) {
        return reject(e);
      }
    });
  }
  assignReviewers(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`payload is ${JSON.stringify(payload)}`)
        let article: any = await this.article.findById(payload.articleId);
        console.log(`Article is ${JSON.stringify(article)}`);
        if (isNull(article)) {
          return reject(`No article with id: ${payload.articleId} exists`);
        }
        console.log(`reviewersWalletAddress is ${payload.reviewersWalletAddress}`)
        article.reviewersWalletAddress = payload.reviewersWalletAddress;
        article.status = articleStatus.REVIEWERASSIGNED;
        let response: any = await this.article.updateOne({_id: payload.articleId, deleted: false}, {$set: article}, {new: true});
        return resolve(response);
      } catch (e) {
        return reject(e);
      }
    });
  }

  getAssignedArticles(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`reviewersWalletAddress is ${payload.reviewersWalletAddress}`)
        let articles = await this.article.find({
          status: articleStatus.REVIEWERASSIGNED, 
          reviewersWalletAddress: {$in: payload.reviewersWalletAddress}
        })
        return resolve(articles)
      } catch (e) {
        return reject(e);
      }
    });
  }

  updateArticleStatus(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let articles = await this.article.updateOne({_id: payload.articleId, deleted: false}, {$set: {status: payload.status}}, {new: true})
        return resolve(articles)
      } catch (e) {
        return reject(e);
      }
    });
  }
}
