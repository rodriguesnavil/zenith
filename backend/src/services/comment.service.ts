import { CommentModel } from "../models/comments/comment.model";
import { isEmpty, isNull } from "lodash";

export default class CommentService {
  comment: CommentModel;
  constructor(comment: CommentModel) {
    this.comment = comment;
  }

  insertCommnet(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let comment: any = await this.comment.findOne({
          articleId: payload.articleId,
          reviewerWalletAddress: payload.reviewerWalletAddress,
        });
        if (isNull(comment)) {
          comment = {
            articleId: payload.articleId,
            reviewerWalletAddress: payload.reviewerWalletAddress,
            comment: payload.comment,
          };
          comment = await this.comment.save(comment);
          return resolve(comment);
        } else {
          return reject("Comment already saved");
        }
      } catch (e) {
        return reject(e);
      }
    });
  }

  getComment(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(`comment Id is ${payload.commentId}`)
        let comment: any = await this.comment.findById(payload.commentId)
        return resolve(comment)
      } catch (e) {
        return reject(e);
      }
    });
  }
  getArticleComments(payload: any) {
    return new Promise(async (resolve, reject) => {
      try {
        let comments: any = await this.comment.find({articleId:payload.articleId})
        return resolve(comments)
      } catch (e) {
        return reject(e);
      }
    });
  }
}
