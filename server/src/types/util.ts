import type { Types } from 'mongoose';

export type Nullable<T> = T extends object
  ? {
      [Key in keyof T]: T[Key] | null;
    }
  : T | null;

export type WithMongoId<T> = T extends object ? T & { _id: Types.ObjectId } : T;
