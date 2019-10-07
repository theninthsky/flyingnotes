import mongoose, { Document, Schema } from 'mongoose';

interface IFeed extends Document {
    user: object,
    name: string;
    url: string;
}

const feedSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export default mongoose.model<IFeed>('feed', feedSchema);