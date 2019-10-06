import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    theme?: string;
    notes: [];
    feeds: [];
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
    notes: Array,
    feeds: Array
});

export default mongoose.model<IUser>('User', userSchema);