import { model, Schema } from 'mongoose';
import { EventDoc } from './types';

const EventSchema = new Schema<EventDoc>({
    title: { type: Schema.Types.String, required: true },
    description: { type: Schema.Types.String, required: true },
    price: { type: Schema.Types.Number, required: true },
    date: { type: Schema.Types.Date, default: Date.now },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

export default model<EventDoc>('events', EventSchema);
