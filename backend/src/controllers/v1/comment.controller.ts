import { Request, Response, NextFunction } from "express";
import CommentService from "../../services/comment.service";
import { CommentModel } from "../../models/comments/comment.model";

const insertCommnet = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let payload = req.body
    let commnetService = new CommentService(new CommentModel());
    let response = await commnetService.insertCommnet(payload)
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