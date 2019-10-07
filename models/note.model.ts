import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
    user: object,
    title?: string;
    content: string;
    color?: string;
    date: Date;
}

const noteSchema: Schema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    title: String,
    content: {
        type: String,
        required: true
    },
    color: String,
    date: { 
        type: Date,
        default: Date.now(),
        required: true
    }
});

export default mongoose.model<INote>('Note', noteSchema);