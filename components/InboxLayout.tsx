// components/InboxLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Toolbar from '@/components/Toolbar';
import CommunicationList from '@/components/CommunicationList';
import CommunicationPreview from '@/components/CommunicationPreview';
import { User } from '@supabase/supabase-js';

interface InboxLayoutProps {
  user: User;
}

export default function InboxLayout({ user }: InboxLayoutProps) {
  const [selectedComm, setSelectedComm] = useState<string | null>(null);

  // Mock data for now; replace with Supabase data later
  const communications = [
    { id: '1', sender: 'john@example.com', content: 'Meeting at 3 PM' },
    { id: '2', sender: 'jane@example.com', content: 'Project update' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] w-full">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar user={user} />
        <div className="flex-1 flex overflow-hidden">
          <CommunicationList communications={communications} onSelect={setSelectedComm} />
          {selectedComm && (
            <CommunicationPreview
              communication={communications.find(c => c.id === selectedComm)!}
            />
          )}
        </div>
      </div>
    </div>
  );
}