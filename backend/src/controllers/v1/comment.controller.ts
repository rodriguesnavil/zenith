import { Request, Response, NextFunction } from "express";
import CommentService from "../../services/comment.service";
import { CommentModel } from "../../models/comments/comment.model";
import ArticleService from "../../services/article.service";
import { ArticleModel } from "../../models/article/article.model";
import { articleStatus } from "../../models/article/schema";

const insertCommnet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body
    let commnetService = new CommentService(new CommentModel());
    let articleService = new ArticleService(new ArticleModel());
    
    let response = await commnetService.insertCommnet(payload)
    // now call the article service to update status to REVIEWED

    let articlePayload = {
      articleId: payload.articleId,
      status: articleStatus.REVIEWCOMPLETED,
    };

    let articleResponse = await articleService.updateArticleStatus(
      articlePayload
    );

    return res.send({
        success: true,
        data: {
          response,
          articleResponse,
        },
      });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
const getComment = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let commnetService = new CommentService(new CommentModel());
    const payload = req.params
    let response = await commnetService.getComment(payload)
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

const getArticleComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let commnetService = new CommentService(new CommentModel());
    const payload = req.params
    let response = await commnetService.getArticleComments(payload)
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

export {insertCommnet,getComment,getArticleComments}