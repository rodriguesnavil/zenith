import {schema,articleStatus} from './schema';
import * as mongoose from "mongoose";


const ArticleSchema = new mongoose.Schema(
    schema, {
        timestamps:true
    }
)

export type Article = {
    _id?: string
    title?:string
    created_at?:string
    deleted:boolean | Date
    status: articleStatus
    authors: mongoose.Schema.Types.ObjectId
}

export type Query = {
    _id?: string
    title?:string
    status:articleStatus
}

export class ArticleModel {
    private articleModel : mongoose.Model<any>;
    constructor() {
        this.articleModel = mongoose.model("Article", ArticleSchema);
    }

    save(article: Article): Promise<mongoose.Document>{
        const doc = new this.articleModel(article);
        return  doc.save()
    }

    async findById(id: string, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Article>>{
        return this.articleModel.findOne({_id: id},projection, options).lean();
    }

    async findOne(query:Query, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Article>> {
        let q: mongoose.FilterQuery<any> = query;
        return this.articleModel.findOne(q, projection, options).lean();
    }

    async updateOne(query:Query, update: mongoose.UpdateQuery<any>, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Article>>{
        let q: mongoose.FilterQuery<any> = query;
        return this.articleModel.findOneAndUpdate(q, update, options).lean();
    }
    async find(query: any, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocumentOrArray<Article[]>>{
        return this.articleModel.find(query,projection, options).lean()
    }
    async deleteOne(query: Query): Promise<any>{
        let q: mongoose.FilterQuery<any> = query;
        return this.articleModel.findOneAndUpdate(q, { $set: { deleted: new Date() }}).lean();
    }

}