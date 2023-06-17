import {schema} from './schema';
import * as mongoose from "mongoose"

const CommentSchema = new mongoose.Schema(
    schema, {
        timestamps:true
    }
)

export type Comment = {
    articleId?:string
    reviewerWalletAddress?:string
    comment?:string
}

export type Query = {
    _id?:string
    articleId?:string
    reviewerWalletAddress?:string
    comment?:string
}

export class CommentModel {
    private commentModel : mongoose.Model<any>;
    constructor() {
        this.commentModel = mongoose.model("Comment", CommentSchema);
    }

    save(comment: Comment): Promise<mongoose.Document>{
        const doc = new this.commentModel(comment);
        return  doc.save()
    }

    async findById(id: string, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Comment>>{
        return this.commentModel.findOne({_id: id},projection, options).lean();
    }

    async findOne(query:Query, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Comment>> {
        let q: mongoose.FilterQuery<any> = query;
        return this.commentModel.findOne(q, projection, options).lean();
    }

    async updateOne(query:Query, update: mongoose.UpdateQuery<any>, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Comment>>{
        let q: mongoose.FilterQuery<any> = query;
        return this.commentModel.findOneAndUpdate(q, update, options).lean();
    }
    async find(query: any, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocumentOrArray<Comment[]>>{
        return this.commentModel.find(query,projection, options).lean()
    }
    async deleteOne(query: Query): Promise<any>{
        let q: mongoose.FilterQuery<any> = query;
        return this.commentModel.findOneAndUpdate(q, { $set: { deleted: new Date() }}).lean();
    }

}