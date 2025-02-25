import { readdir, unlink } from 'node:fs/promises';
import { createServer } from 'node:http';
import { existsSync } from 'node:fs';
import path from 'node:path';

import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cron from 'node-cron';
import express from 'express';
import compression from 'compression';
import fileUpload from 'express-fileupload';
import { rateLimit } from 'express-rate-limit';
import { clerkMiddleware } from '@clerk/express';
import mongoSanitize from 'express-mongo-sanitize';

import { env } from './config/env';
import { connectDB } from './config/db';
import { initializeSocket } from './config/socket';

import apiRoutes from './routes';

import errorController from './controllers/errorController';

import {
  MAX_TEMP_FILE_SIZE,
  MAX_WINDOW_LIFETIME,
  MAX_REQUESTS_PER_WNDOW,
} from './utils/constants';

const app = express();
const httpServer = createServer(app);

const PORT = env.PORT;
const tempDir = path.join(process.cwd(), 'temp');

initializeSocket(httpServer);

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: tempDir,
    createParentPath: true,
    limits: {
      fileSize: MAX_TEMP_FILE_SIZE,
    },
  })
);
app.use(
  rateLimit({
    windowMs: MAX_WINDOW_LIFETIME,
    limit: MAX_REQUESTS_PER_WNDOW,
    standardHeaders: true,
    legacyHeaders: false,
    message:
      'We have received too many requests from you. Please try again later.',
  })
);
app.use(helmet());
app.use(morgan('dev'));
app.use(compression());
app.use(express.json());
app.use(mongoSanitize());
app.use(express.urlencoded({ extended: true }));
app.use(clerkMiddleware());

cron.schedule('0 * * * *', () => {
  if (existsSync(tempDir)) {
    readdir(tempDir)
      .then(files => {
        for (const file of files) {
          unlink(path.join(tempDir, file));
        }
      })
      .catch(console.error);
  }
});

if (env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
}

app.use('/api/v1', apiRoutes);

app.use('*', errorController.notFound);

app.use(errorController.globalErrorHandler);

httpServer.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on http://localhost:${PORT}`);
});
