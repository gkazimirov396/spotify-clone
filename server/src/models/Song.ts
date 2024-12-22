import { Schema, SchemaTypes, Types, model } from 'mongoose';

export interface ISong {
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
  duration: number;
  albumId: Types.ObjectId;
}

const songSchema = new Schema<ISong>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    audioUrl: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      min: 0,
      required: true,
    },
    albumId: {
      type: SchemaTypes.ObjectId,
      ref: 'Album',
      required: false,
    },
  },
  { timestamps: { createdAt: 'recordedAt', updatedAt: true } }
);

export const Song = model('Song', songSchema);
