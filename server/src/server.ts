// import 'dotenv/config';

import { createServer } from 'node:http';
import path from 'node:path';

import express from 'express';

import cors from 'cors';
import helmet from 'helmet';
// import dotenv from 'dotenv';
import fileUpload from 'express-fileupload';
import { clerkMiddleware } from '@clerk/express';

import { env } from './config/env';
import { connectDB } from './config/db';
import { initializeSocket } from './config/socket';

import apiRoutes from './routes';

import errorController from './controllers/errorController';

import { MAX_TEMP_FILE_SIZE } from './utils/constants';

// dotenv.config();

const app = express();
const httpServer = createServer(app);

const PORT = env.PORT;

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
    tempFileDir: path.join(__dirname, 'temp'),
    createParentPath: true,
    limits: {
      fileSize: MAX_TEMP_FILE_SIZE,
    },
  })
);
app.use(helmet());
app.use(express.json());
app.use(clerkMiddleware());

// const tempDir = path.join(process.cwd(), "temp");
// cron.schedule("0 * * * *", () => {
// 	if (fs.existsSync(tempDir)) {
// 		fs.readdir(tempDir, (err, files) => {
// 			if (err) {
// 				console.log("error", err);
// 				return;
// 			}
// 			for (const file of files) {
// 				fs.unlink(path.join(tempDir, file), (err) => {});
// 			}
// 		});
// 	}
// });

// if (env.NODE_ENV === "production") {
// 	app.use(express.static(path.join(__dirname, "../frontend/dist")));
// 	app.get("*", (req, res) => {
// 		res.sendFile(path.resolve(__dirname, "../frontend", "dist", "index.html"));
// 	});
// }

app.use('/api/v1', apiRoutes);

app.use('*', errorController.notFound);

app.use(errorController.globalErrorHandler);

httpServer.listen(PORT, async () => {
  await connectDB();

  console.log(`Server is running on http://localhost:${PORT}`);
});
