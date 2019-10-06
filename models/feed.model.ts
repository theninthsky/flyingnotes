import mongoose, { Document, Schema } from 'mongoose';

interface IFeed extends Document {
    name: string;
    url: string;
}

const feedSchema: Schema = new Schema({
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