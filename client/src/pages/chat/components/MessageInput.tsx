import { useState } from 'react';

import { Send } from 'lucide-react';
import { useUser } from '@clerk/clerk-react';

import { useChatStore } from '@/store/chat';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function MessageInput() {
  const { user } = useUser();

  const [newMessage, setNewMessage] = useState('');

  const sendMessage = useChatStore(state => state.sendMessage);
  const selectedUser = useChatStore(state => state.selectedUser);

  const handleSend = () => {
    if (!selectedUser || !user || !newMessage) return;

    sendMessage(selectedUser.clerkId, user.id, newMessage.trim());
    setNewMessage('');
  };

  return (
    <div className="p-4 mt-auto border-t border-zinc-800">
      <div className="flex gap-2">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          className="border-none bg-zinc-800"
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          required
          maxLength={250}
        />

        <Button size="icon" onClick={handleSend} disabled={!newMessage.trim()}>
          <Send className="size-4" />
        </Button>
      </div>
    </div>
  );
}
