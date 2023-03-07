import { Schema, model } from 'mongoose';
import { UrlData } from '../@types/types';

const UrlSchema: Schema<UrlData> = new Schema({
    url: {
        type: String,
        required: true,
        lowercase: true
    },
    urlId: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: () => new Date()
    }
});

export default model<UrlData>('Url', UrlSchema);