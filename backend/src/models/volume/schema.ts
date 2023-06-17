import * as mongoose from 'mongoose';
import * as articleSchema from "../article/schema"

export enum volumeStatus {
    PREPUBLICATION = 'PREPUBLICATION',
    PUBLISHED = 'PUBLISHED',
    NOSTATUS = 'NO STATUS'
}

const volumeSchema = {
    volumeId:{
        type: String,
        required:true
    },
    created_at:{
        type: Date,
        required:true,
    },
    deleted:{
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: false
    },
    status:{
        type: volumeStatus,
        required:true,
        default:volumeStatus.NOSTATUS
    },
    articles: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:articleSchema,
        required:true
    }]
}

export const schema = volumeSchema;
