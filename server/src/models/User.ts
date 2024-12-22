import { Schema, model } from 'mongoose';

interface IUser {
  userName: string;
  imageUrl: string;
  clerkId: string;
}

const userSchema = new Schema<IUser>(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = model('User', userSchema);
