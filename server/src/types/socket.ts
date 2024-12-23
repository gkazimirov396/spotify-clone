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
export interface ServerToClientEvents {
  users_online: (users: string[]) => void;
  activities: (activities: [string, Activities][]) => void;
  user_connected: (userId: string) => void;
  user_disconnected: (userId: string) => void;
  receive_message: (message: IMessage) => void;
  message_sent: (message: IMessage) => void;
  activity_updated: (activity: ActivityProps) => void;
  message_error: (error: string) => void;
}

export interface ServerToClientEvents {}
