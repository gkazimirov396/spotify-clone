import { Schema, model, Types, SchemaTypes } from 'mongoose';

import { CURRENT_YEAR } from '../utils/constants';

interface IAlbum {
  title: string;
  artist: string;
  imageUrl: string;
  releaseYear: number;
  songs: Types.ObjectId[];
}

const albumSchema = new Schema<IAlbum>(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    releaseYear: {
      type: Number,
      required: true,
      min: [1889, 'The first ever music album got released in 1889!'],
      max: [CURRENT_YEAR, `The value cannot be bigger than ${CURRENT_YEAR}!`],
      validate: {
        validator: (year: number) => Number.isInteger(year),
        message: '{VALUE} has to be an integer!',
      },
    },
    songs: [{ type: SchemaTypes.ObjectId, ref: 'Song' }],
  },
  { timestamps: true }
);

export const Album = model('Album', albumSchema);
