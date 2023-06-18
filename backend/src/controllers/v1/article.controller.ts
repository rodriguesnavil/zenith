import { Request, Response, NextFunction } from "express";
import ArticleService from "../../services/article.service";
import LightHouseService from "../../services/lighthouse.service";
import { ArticleModel } from "../../models/article/article.model";
import * as path from "path";

const insertArticle = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let articleService = new ArticleService(new ArticleModel());
  try {
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
  let lighthouseService = new LightHouseService();
  try {
    // 1. call the uploadvolume from lighthouse service, send the filename, file path
    // 2. call the getparams from lighthouse service, send the filename. from the resp(we need label i.e payloadCID)
    // 3. tokenId will be at the backend

    let articleId = req.params.articleId;

    let article: any = await articleService.getArticle(articleId);
    console.log(`article --> ${JSON.stringify(article)}`)

    let fileName = path.basename(article.filePath);
    
    let uploadVolumeResponse = await lighthouseService.uploadVolume(
      fileName
    );

    console.log(`uploadVolumeResponse --> ${JSON.stringify(uploadVolumeResponse)}`)

    let paramsResponse = await lighthouseService.getParams(fileName);

    console.log(`getParamsResponse --> ${JSON.stringify(paramsResponse)}`)

    
    // {"pieceCid":"baga6ea4seaqeebab74ccvppzjnoewiogkdsvza3226pbrun3taow7ygpgnid4ai","pieceSize":131072,"label":"bafybeigr5llzvrv4df22ouvcixyfq22hjl4ttrcgihrwsoy6llkzhnkmti","carSize":116722,"id":"29bd3462-cf84-43a0-ad18-1d2da9008842"}
    
    let articlePayload = {
      articleId,
      payloadCID: paramsResponse.label,
      authorWalletAddress: article.walletAddresses[0],
      description: "New description 34",
    };

    console.log(`articlePayload --> ${JSON.stringify(articlePayload)}`)
    let response = await articleService.proposeArticle(articlePayload);
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
const assignReviewers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let articleService = new ArticleService(new ArticleModel());

    let payload = req.body;
    let response = await articleService.assignReviewers(payload);
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
const getAssignedArticles = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let articleService = new ArticleService(new ArticleModel());

    let payload = req.body;
    let response = await articleService.getAssignedArticles(payload);
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

const getParams = async (req: Request, res: Response, next: NextFunction) => {
  let lighthouseService = new LightHouseService();
  try {
    let fileName = req.params.fileName;
    let response = await lighthouseService.getParams(fileName);
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

export {
  insertArticle,
  proposeArticle,
  voteArticle,
  queueArticle,
  executeArticle,
  getAllArtilces,
  getArticle,
  assignReviewers,
  getAssignedArticles,
  getParams
};
