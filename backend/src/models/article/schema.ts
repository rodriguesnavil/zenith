import * as mongoose from 'mongoose';
import * as userSchema from "../user/schema"

export enum articleStatus {
    SUBMITTED = 'SUBMITTED',
    SENTTOAUTHOR = 'Sent to Author',
    EDITORASSIGNED = 'Editor Assigned',
    REVIEWERASSIGNED = 'Reviewer Assigned',
    REVIEWINPROGRESS = 'Review in Progress',
    REVIEWCOMPLETED = 'Review Completed',
    REVISIONREQUESTED = 'Revision Requested',
    REVISIONSUBMITTED = 'Revision Submitted',
    PENDINGDECISION = 'Pending decision',
    ACCEPTED = 'Accepted',
    REJECTED = 'Rejected',
    PUBLISHED = 'Published',
    NOSTATUS = 'No Status'
}

const articleSchema = {
    title:{
        type: String,
        required: true,
        maxlength:100
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
        type: articleStatus,
        required:true,
        default:articleStatus.NOSTATUS
    },
    walletAddresses: [String],
    filePath: String,
    filename: String,
    fileType: String,
    extension: String,
    reviewersWalletAddress:[String]
}

export const schema = articleSchema;
