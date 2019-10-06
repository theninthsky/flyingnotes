import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
    title?: string;
    content: string;
    color?: string;
    date: Date;
}

const noteSchema: Schema = new Schema({
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