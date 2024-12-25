import { HeadphonesIcon, Music, Users } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';

import { useChatStore } from '@/store/chat';

import userService from '@/services/user';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function FriendsActivity() {
  const { user } = useUser();

  const onlineUsers = useChatStore(state => state.onlineUsers);
  const userActivities = useChatStore(state => state.userActivities);

  const { data: users, isSuccess } = useQuery({
    queryKey: ['users'],
    queryFn: userService.fetchUsers,
    enabled: !!user,
  });

  return (
    <div className="flex flex-col h-full rounded-lg bg-zinc-900">
      <div className="flex items-center justify-between p-4 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <Users className="size-5 shrink-0" />
          <h2 className="font-semibold">What they're listening to</h2>
        </div>
      </div>

      {!user && <LoginPrompt />}

      {isSuccess && (
        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {users.map(user => {
              const activity = userActivities.get(user.clerkId);
              const isPlaying = activity && activity !== 'Idle';

              return (
                <div
                  key={user._id}
                  className="p-3 transition-colors rounded-md cursor-pointer hover:bg-zinc-800/50 group"
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <Avatar className="border size-10 border-zinc-800">
                        <AvatarImage src={user.imageUrl} alt={user.userName} />
                        <AvatarFallback>{user.userName}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 
												${onlineUsers.has(user.clerkId) ? 'bg-green-500' : 'bg-zinc-500'}
												`}
                        aria-hidden="true"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-white">
                          {user.userName}
                        </span>
                        {isPlaying && (
                          <Music className="size-3.5 text-emerald-400 shrink-0" />
                        )}
                      </div>

                      {isPlaying ? (
                        <div className="mt-1">
                          <div className="mt-1 text-sm font-medium text-white truncate">
                            {activity.replace('Playing ', '').split(' by ')[0]}
                          </div>
                          <div className="text-xs truncate text-zinc-400">
                            {activity.split(' by ')[1]}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-1 text-xs text-zinc-400">Idle</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}

function LoginPrompt() {
  return (
    <div className="flex flex-col items-center justify-center h-full p-6 space-y-4 text-center">
      <div className="relative">
        <div
          className="absolute rounded-full opacity-75 -inset-1 bg-gradient-to-r from-emerald-500 to-sky-500 blur-lg animate-pulse"
          aria-hidden="true"
        />
        <div className="relative p-4 rounded-full bg-zinc-900">
          <HeadphonesIcon className="size-8 text-emerald-400" />
        </div>
      </div>

      <div className="space-y-2 max-w-[250px]">
        <h3 className="text-lg font-semibold text-white">
          See What Friends Are Playing
        </h3>
        <p className="text-sm text-zinc-400">
          Login to discover what music your friends are enjoying right now
        </p>
      </div>
    </div>
  );
}
