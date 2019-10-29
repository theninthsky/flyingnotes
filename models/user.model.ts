import mongoose, { Document, Schema } from 'mongoose';

interface INote extends Document {
    category?: string;
    title?: string;
    content: string;
    color?: string;
    date: Date;
}

const noteSchema: Schema = new Schema({
    category: String,
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

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    theme?: string;
    notes: any[];
}

const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        validate: (value: string): boolean => value.includes('@')
    },
    password: {
        type: String,
        minlength: 8,
        required: true
    },
    theme: {
        type: String,
        default: 'light'
    },
    notes: [noteSchema]
});

export default mongoose.model<IUser>('User', userSchema);