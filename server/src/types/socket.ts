import type { IMessage } from '../models/Message';

export type Activities = 'Idle' | (string & {});

interface ActivityProps {
  userId: string;
  activity: Activities;
}

export interface ClientToServerEvents {
  user_connected: (userId: string) => void;
  update_activity: (activity: ActivityProps) => void;
  send_message: (data: IMessage) => Promise<void>;
}

export interface ServerToClientEvents {}
