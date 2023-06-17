import {schema, volumeStatus} from './schema'
import * as mongoose from "mongoose"

const VolumeSchema = new mongoose.Schema(
    schema, {
        timestamps:true
    }
)

export type Volume = {
    _id?: string,
    volumeId: string,
    created_at?:string
    deleted:boolean | Date
    status: volumeStatus
    articles: [mongoose.Schema.Types.ObjectId]
}

export type Query = {
    _id?:string,
    volumeId?:string,
}


export class VolumeModel {
    private volumeModel : mongoose.Model<any>;
    constructor() {
        this.volumeModel = mongoose.model("Volume", VolumeSchema);
    }

    save(volume: Volume): Promise<mongoose.Document>{
        const doc = new this.volumeModel(volume);
        return  doc.save()
    }

    async findById(id: string, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Volume>>{
        return this.volumeModel.findOne({_id: id},projection, options).lean();
    }

    async findOne(query:Query, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Volume>> {
        let q: mongoose.FilterQuery<any> = query;
        return this.volumeModel.findOne(q, projection, options).lean();
    }

    async updateOne(query:Query, update: mongoose.UpdateQuery<any>, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Volume>>{
        let q: mongoose.FilterQuery<any> = query;
        return this.volumeModel.findOneAndUpdate(q, update, options).lean();
    }
    async find(query: any, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocumentOrArray<Volume[]>>{
        return this.volumeModel.find(query,projection, options).lean()
    }
    async deleteOne(query: Query): Promise<any>{
        let q: mongoose.FilterQuery<any> = query;
        return this.volumeModel.findOneAndUpdate(q, { $set: { deleted: new Date() }}).lean();
    }

}