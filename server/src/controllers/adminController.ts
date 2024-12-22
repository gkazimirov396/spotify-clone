import type { RequestHandler } from 'express';
import type { UploadedFile } from 'express-fileupload';

import cloudinary from '../lib/cloudinary';

import { Song } from '../models/Song';
import { Album } from '../models/Album';

import { NewSong } from '../schema/NewSong';
import { NewAlbum } from '../schema/NewAlbum';

import { ServerError } from '../utils/ServerError';

import type {
  RequestHandlerWithBody,
  RequestHandlerWithDynamicId,
} from '../types/request-handler';

const uploadToCloudinary = async (file: UploadedFile) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: 'auto',
    });

    return result.secure_url;
  } catch (error) {
    console.log('Error in uploadToCloudinary');

    throw new Error('Error uploading to cloudinary');
  }
};

const checkAdmin: RequestHandler = async (req, res, next) => {
  res.status(200).json({ admin: true });
};

export const createSong: RequestHandlerWithBody<NewSong> = async (
  req,
  res,
  next
) => {
  const { title, artist, albumId, duration } = req.body;

  try {
    if (!req.files || !req.files.audioFile || !req.files.imageFile) {
      const error = new ServerError(400, 'Please upload all files');

      throw error;
    }

    const audioFile = req.files.audioFile as UploadedFile;
    const imageFile = req.files.imageFile as UploadedFile;

    const audioUrl = await uploadToCloudinary(audioFile);
    const imageUrl = await uploadToCloudinary(imageFile);

    const song = await Song.create({
      title,
      artist,
      audioUrl,
      imageUrl,
      duration,
      albumId: albumId ?? null,
    });

    if (albumId) {
      await Album.findByIdAndUpdate(albumId, {
        $push: { songs: song._id },
      });
    }

    res.status(201).json(song);
  } catch (error) {
    console.log('Error in createSong');

    next(error);
  }
};

const deleteSong: RequestHandlerWithDynamicId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const song = await Song.findById(id);

    if (!song) {
      const error = new ServerError(404, 'Song with that id does not exist!');

      throw error;
    }

    if (song.albumId) {
      await Album.findByIdAndUpdate(song.albumId, {
        $pull: { songs: song._id },
      });
    }

    const result = await Song.findByIdAndDelete(id);

    res.status(200).json({ success: !!result });
  } catch (error) {
    console.log('Error in deleteSong');

    next(error);
  }
};

export const createAlbum: RequestHandlerWithBody<NewAlbum> = async (
  req,
  res,
  next
) => {
  const { title, artist, releaseYear } = req.body;

  try {
    if (!req.files || !req.files.imageFile) {
      const error = new ServerError(400, 'Please upload an image file');

      throw error;
    }

    const imageFile = req.files.imageFile as UploadedFile;

    const imageUrl = await uploadToCloudinary(imageFile);

    const album = await Album.create({
      title,
      artist,
      imageUrl,
      releaseYear,
    });

    res.status(201).json(album);
  } catch (error) {
    console.log('Error in createAlbum');

    next(error);
  }
};

const deleteAlbum: RequestHandlerWithDynamicId = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [songResult, albumResult] = await Promise.all([
      Song.deleteMany({ albumId: id }),
      Album.findByIdAndDelete(id),
    ]);

    res.status(200).json({
      success: songResult.deletedCount > 0 && !!albumResult,
    });
  } catch (error) {
    console.log('Error in deleteAlbum');

    next(error);
  }
};

export default { checkAdmin, deleteAlbum, deleteSong, createSong, createAlbum };
