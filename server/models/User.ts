import { Schema, model } from 'mongoose';
import { UserDoc } from './types';

const UserSchema = new Schema<UserDoc>(
    {
        email: { type: Schema.Types.String, required: true },
        password: { type: Schema.Types.String, required: true },
        createdEvents: [
            {
                type: Schema.Types.ObjectId,
                ref: 'events',
            },
        ],
    },
    { timestamps: true }
);

export default model<UserDoc>('users', UserSchema);
