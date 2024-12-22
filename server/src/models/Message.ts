import { Schema, model } from 'mongoose';

export interface IMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

const messageSchema = new Schema<IMessage>(
  {
    senderId: {
      type: String,
      required: true,
    },
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      maxLength: 225,
      required: true,
    },
  },
  { timestamps: true }
);

export const Message = model('Message', messageSchema);
