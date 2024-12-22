import { connect } from 'mongoose';

import { env } from './env';

export const connectDB = async () => {
  try {
    const conn = await connect(env.MONGO_URI);
    console.log(`Connected to Mongo ${conn.connection.host}`);
  } catch (error) {
    console.log('Failed to connect to Mongo', error);
    process.exit(1);
  }
};
