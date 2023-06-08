import { Request, Response, NextFunction } from "express";
import ArticleService from "../../services/article.service";
import { ArticleModel } from "../../models/article/article.model";
const insertArticle = async (req: Request, res: Response, next: NextFunction) => {
    console.log("I am here")
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

export {
    insertArticle
}
