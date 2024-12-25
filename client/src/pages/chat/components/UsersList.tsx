import { useQuery } from '@tanstack/react-query';

import { useChatStore } from '@/store/chat';

import userService from '@/services/user';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import UsersListSkeleton from '@/components/skeletons/UsersListSkeleton';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function UsersList() {
  const onlineUsers = useChatStore(state => state.onlineUsers);
  const selectedUser = useChatStore(state => state.selectedUser);

  const setSelectedUser = useChatStore(state => state.setSelectedUser);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: userService.fetchUsers,
  });

  return (
    <div className="border-r border-zinc-800">
      <div className="flex flex-col h-full">
        <ScrollArea className="h-[calc(100vh-280px)]">
          <ul className="p-4 space-y-2">
            {isLoading ? (
              <UsersListSkeleton />
            ) : (
              users?.map(user => (
                <li
                  key={user._id}
                  onClick={() => setSelectedUser(user)}
                  className={`flex items-center justify-center lg:justify-start gap-3 p-3 
										rounded-lg cursor-pointer transition-colors
                    ${
                      selectedUser?.clerkId === user.clerkId
                        ? 'bg-zinc-800'
                        : 'hover:bg-zinc-800/50'
                    }`}
                >
                  <div className="relative">
                    <Avatar className="size-8 md:size-12">
                      <AvatarImage src={user.imageUrl} />
                      <AvatarFallback>{user.userName}</AvatarFallback>
                    </Avatar>

                    <div
                      className={`absolute bottom-0 right-0 h-3 w-3 rounded-full ring-2 ring-zinc-900
                        ${
                          onlineUsers.has(user.clerkId)
                            ? 'bg-green-500'
                            : 'bg-zinc-500'
                        }`}
                    />
                  </div>

                  <div className="flex-1 hidden min-w-0 lg:block">
                    <span className="font-medium truncate">
                      {user.userName}
                    </span>
                  </div>
                </li>
              ))
            )}
          </ul>
        </ScrollArea>
      </div>
    </div>
  );
}
