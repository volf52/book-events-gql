import { Document as MDoc } from 'mongoose';

export interface EventDoc extends MDoc {
    title: string;
    description: string;
    price: number;
    date: Date;
    createdBy: UserDoc['_id'];
}

export interface UserDoc extends MDoc {
    email: string;
    password: string;
    createdEvents: Array<EventDoc['_id']>;
    createdAt: Date;
    updatedAt: Date;
}
