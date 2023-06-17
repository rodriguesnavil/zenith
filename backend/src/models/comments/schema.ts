import * as mongoose from 'mongoose';

const commentSchema = {
    articleId: {
        type: String,
        required:true
    },
    reviewerWalletAddress: {
        type: String,
        required:true
    },
    comment: {
        type: String,
        required:true
    }
}

export const schema = commentSchema;