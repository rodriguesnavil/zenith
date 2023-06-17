import {schema, proposalStatus,vote} from './schema'
import * as mongoose from "mongoose";



const ProposalSchema = new mongoose.Schema(
    schema, {
        timestamps:true
    }
)
export type Proposal = {
    _id:string,
    proposalId:string,
    proposer:string,
    targetContractAddress:[string],
    etherSent:[string],
    encodedCallData:string,
    voteStart:string,
    voteEnd:string,
    proposalDescription:string,
    created_at?:string,
    deleted: boolean|Date,
    votes: [typeof vote],
    status: proposalStatus
}

export type Query = {
    _id?:string
    proposalId?:string
    targetContractAddress?:string
    deleted?:boolean | Date
    status?:proposalStatus
}

export class ProposalModel {
    private proposalModel : mongoose.Model<any>;
    constructor() {
        this.proposalModel = mongoose.model("Proposal", ProposalSchema);
    }

    save(proposal: Proposal): Promise<mongoose.Document>{
        const doc = new this.proposalModel(proposal);
        return  doc.save()
    }

    async findById(id: string, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Proposal>>{
        return this.proposalModel.findOne({_id: id},projection, options).lean();
    }
    async findByProposalId(id: string, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Proposal>>{
        return this.proposalModel.findOne({proposalId: id},projection, options).lean();
    }
    async findOne(query:Query, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Proposal>> {
        let q: mongoose.FilterQuery<any> = query;
        return this.proposalModel.findOne(q, projection, options).lean();
    }

    async updateOne(query:Query, update: mongoose.UpdateQuery<any>, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocument<Proposal>>{
        let q: mongoose.FilterQuery<any> = query;
        return this.proposalModel.findOneAndUpdate(q, update, options).lean();
    }
    async find(query: any, projection= {}, options: mongoose.QueryOptions = {}): Promise<mongoose.LeanDocumentOrArray<Proposal[]>>{
        return this.proposalModel.find(query,projection, options).lean()
    }
    async deleteOne(query: Query): Promise<any>{
        let q: mongoose.FilterQuery<any> = query;
        return this.proposalModel.findOneAndUpdate(q, { $set: { deleted: new Date() }}).lean();
    }

}