import * as mongoose from "mongoose";


export enum proposalStatus {
    NOSTATUS = 'NOSTATUS',
    CREATED = 'CREATED',
    VOTING = 'VOTING',
    QUEUED = 'QUEUED',
    EXECUTED = 'EXECUTED'
}
export const vote = new mongoose.Schema({
  voter: {
    type: String,
    required: true,
    maxlength: 30,
  },
  support: {
    type: String,
    required: true,
    maxlength: 1,
  },
  weight: { type: String, required: true, maxlength: 30 },
  reason: { type: String, required: true, maxlength: 200 },
});
const proposalSchema = {
  proposalId: {
    type: String,
    required: true,
    maxlength: 100,
  },
  proposer: {
    type: String,
    required: true,
    maxlength: 100,
  },
  targetContractAddress: {
    type: [String],
    required: true,
  },
  etherSent: {
    type: [String],
    required: true,
  },
  encodedCallData: {
    type: [String],
    required: true,
  },
  voteStart: {
    type: String,
    required: true,
    maxlength: 10,
  },
  voteEnd: {
    type: String,
    required: true,
    maxlength: 10,
  },
  proposalDescription: {
    type: String,
    required: true,
    maxlength: 200,
  },
  created_at: {
    type: Date,
    required: true,
  },
  deleted: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
    default: false,
  },
  votes: [
    {
      type: vote,
      required:true,
      default:false
    },
  ],
  status:{
    type:proposalStatus,
    required:true,
    default:proposalStatus.NOSTATUS
  }
};
export const schema = proposalSchema;
