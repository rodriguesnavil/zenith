import { Request, Response, NextFunction } from "express";
import ArticleService from "../../services/article.service";
import { ArticleModel } from "../../models/article/article.model";

const insertArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    console.log(`here in controller`);
    let payload = req.body;
    
    if (!payload.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    let response = await articleService.upsertArticle(payload);
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
const getAllArtilces = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    let response = await articleService.getAllArticles();
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
const getArticle = async (req: Request, res: Response, next: NextFunction) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    const id = req.params.articleId;
    let response = await articleService.getArticle(id);
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
const proposeArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    let response = await articleService.proposeArticle(req.body);
    return res.send({
      success: true,
      proposalId: response,
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
const voteArticle = async (req: Request, res: Response, next: NextFunction) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    let response = await articleService.voteArticle(req.body);
    return res.send({
      success: true,
      proposalState: response,
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
const queueArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    let response = await articleService.queueArticle(req.body);
    return res.send({
      success: true,
      queueStatus: response,
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
const executeArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
    let response = await articleService.executeArticle(req.body);
    return res.send({
      success: true,
      ArticleStatus: response,
    });
  } catch (e) {
    console.log(e);
    return next(e);
  }
};
export {
  insertArticle,
  proposeArticle,
  voteArticle,
  queueArticle,
  executeArticle,
  getAllArtilces,
  getArticle,
};
