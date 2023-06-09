import * as mongoose from 'mongoose';

export enum userRole {
    AUTHOR = 'AUTHOR',
    REVIEWER = 'REVIEWER',
    EDITOR = 'EDITOR',
}

const userSchema = {
    firstName: {
        type: String,
        required: false,
        maxlength: 100
    },
    lastName: {
        type: String,
        required: false,
        maxlength: 100
    },
    username: {
        type: String,
        required: false,
        maxlength: 100
    },
    email: {
        type: String,
        required: false,
        maxlength: 100
    },
    walletAddress: {
        type: String,
        required: false,
        indexed: true,
    },
    created_at: {
        type: Date,
        required: true,
    },
    profileImge: {
        type: String,
        required: false,
    },
    deleted: {
        type: mongoose.Schema.Types.Mixed,
        required: true,
        default: false
    },
    role: {
        type: [{
            type: String,
            enum: ['AUTHOR', 'REVIEWER', 'EDITOR'],
        }],
        required: false,
        default: "AUTHOR"
    }
}

export const schema = userSchema;