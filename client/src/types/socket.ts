import type { Message } from '.';

interface ActivityProps {
  userId: string;
  activity: string;
}

export interface ClientToServerEvents {
  user_connected: (userId: string) => void;
  update_activity: (activity: ActivityProps) => void;
  send_message: (
    data: Omit<Message, 'createdAt' | 'updatedAt' | '_id'>
  ) => Promise<void>;
}

export interface ServerToClientEvents {
  users_online: (users: string[]) => void;
  activities: (activities: [string, string][]) => void;
  user_connected: (userId: string) => void;
  user_disconnected: (userId: string) => void;
  receive_message: (message: Message) => void;
  message_sent: (message: Message) => void;
  activity_updated: (activity: ActivityProps) => void;
  message_error: (error: string) => void;
}
