import { Request, Response, NextFunction } from "express";
import ArticleService from "../../services/article.service";
import { ArticleModel } from "../../models/article/article.model";
const insertArticle = async (req: Request, res: Response, next: NextFunction) => {
    let articleService = new ArticleService(new ArticleModel());
    try{
        let payload = req.body
        let user = await articleService.upsertArticle(payload);
        return res.send({
            success: true,
            data: {
                user
            }
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const proposeArticle = async (req:Request,res:Response,next:NextFunction) => {
    let articleService = new ArticleService(new ArticleModel());
    try {
        let response = await articleService.proposeArticle(req.body);
        return res.send({
            success: true,
            proposalId: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const voteArticle = async (req:Request,res:Response,next:NextFunction) => {
    let articleService = new ArticleService(new ArticleModel());
    try {
        let response = await articleService.voteArticle(req.body);
        return res.send({
            success: true,
            proposalState: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const queueArticle = async (req:Request,res:Response,next:NextFunction) => {
    let articleService = new ArticleService(new ArticleModel());
    try {
        let response = await articleService.queueArticle(req.body);
        return res.send({
            success: true,
            queueStatus: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
const executeArticle = async (req:Request,res:Response,next:NextFunction) => {
    let articleService = new ArticleService(new ArticleModel());
    try {
        let response = await articleService.executeArticle(req.body);
        return res.send({
            success: true,
            ArticleStatus: response
        })
    }catch (e){
        console.log(e);
        return next(e)
    }
}
export {
    insertArticle, proposeArticle, voteArticle, queueArticle, executeArticle
}
