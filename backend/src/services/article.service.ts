import { ArticleModel, Article } from "../models/article/article.model";
import { ApiError } from "../commons/APIError";
import { connectionErrors } from "../constants";
import { isEmpty, isNull } from "lodash";
import { appConfig } from "../config";
import { ethers } from "ethers";
import * as jwt from "jsonwebtoken";


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
                    article.status = payload.status;
                    article.created_at = new Date();
                    article.authors = payload.authors;
                    article.file = payload.file;
                    article = await this.article.save(article);
                    
                }
                return resolve(article);
            } catch (e) {
                return reject(e)
            }
        })
    }
}
