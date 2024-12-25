import { useChatStore } from '@/store/chat';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ChatHeader() {
  const selectedUser = useChatStore(state => state.selectedUser);
  const onlineUsers = useChatStore(state => state.onlineUsers);

  if (!selectedUser) return null;

  return (
    <header className="p-4 border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <Avatar>
          <AvatarImage src={selectedUser.imageUrl} />
          <AvatarFallback>{selectedUser.userName}</AvatarFallback>
        </Avatar>

        <div>
          <h2 className="font-medium">{selectedUser.userName}</h2>
          <p className="text-sm text-zinc-400">
            {onlineUsers.has(selectedUser.clerkId) ? 'Online' : 'Offline'}
          </p>
        </div>
      </div>
    </header>
  );
}
