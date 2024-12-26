import { useEffect } from 'react';

import { useUser } from '@clerk/clerk-react';
import { useQueryClient } from '@tanstack/react-query';
import { useErrorBoundary } from 'react-error-boundary';

import { useChatStore } from '@/store/chat';

import TopBar from '@/components/TopBar';
import UsersList from './components/UsersList';
import ChatHeader from './components/ChatHeader';
import MessageInput from './components/MessageInput';

import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarImage } from '@/components/ui/avatar';

import { formatMessageTime } from '@/utils/time';

import spotifyLogo from '@/assets/images/spotify.png';

if (Math.random() < 0.5) throw new Error('shit');

export default function ChatPage() {
  const { user } = useUser();
  const { showBoundary } = useErrorBoundary();

  const { messages, fetchMessages, selectedUser, error } = useChatStore();

  const queryClient = useQueryClient();

  if (error) showBoundary(error);

  useEffect(() => {
    if (user) {
      queryClient.invalidateQueries({
        queryKey: ['users'],
        refetchType: 'all',
      });
    }
  }, [queryClient, user]);

  useEffect(() => {
    if (selectedUser) fetchMessages(selectedUser.clerkId);
  }, [selectedUser, fetchMessages]);

  return (
    <section className="h-full overflow-hidden rounded-lg bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />

      <div className="grid lg:grid-cols-[300px_1fr] grid-cols-[80px_1fr] h-[calc(100vh-180px)]">
        <UsersList />

        <div className="flex flex-col h-full">
          {selectedUser ? (
            <>
              <ChatHeader />

              <ScrollArea className="h-[calc(100vh-340px)]">
                <ul className="p-4 space-y-4">
                  {messages.map(message => (
                    <li
                      key={message._id}
                      className={`flex items-start gap-3 ${
                        message.senderId === user?.id ? 'flex-row-reverse' : ''
                      }`}
                    >
                      <Avatar className="size-8">
                        <AvatarImage
                          src={
                            message.senderId === user?.id
                              ? user.imageUrl
                              : selectedUser.imageUrl
                          }
                        />
                      </Avatar>

                      <div
                        className={`rounded-lg p-3 max-w-[70%]
													${message.senderId === user?.id ? 'bg-green-500' : 'bg-zinc-800'}
												`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <span className="block mt-1 text-xs text-zinc-300">
                          {formatMessageTime(message.createdAt)}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>

              <MessageInput />
            </>
          ) : (
            <NoConversationPlaceholder />
          )}
        </div>
      </div>
    </section>
  );
}

function NoConversationPlaceholder() {
  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <img src={spotifyLogo} alt="Spotify" className="size-16 animate-bounce" />

      <div className="text-center">
        <h3 className="mb-1 text-lg font-medium text-zinc-300">
          No conversation selected
        </h3>

        <p className="text-sm text-zinc-500">
          Choose a friend to start chatting
        </p>
      </div>
    </div>
  );
}
