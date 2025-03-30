// components/InboxLayout.tsx
'use client';

import { useState } from 'react';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import CommunicationList from './CommunicationList';
import CommunicationPreview from './CommunicationPreview';
import { User } from '@supabase/supabase-js';

interface Communication {
  id: string;
  user_id: string;
  type: string;
  source: string;
  sender: string;
  recipient: string;
  timestamp: string;
  content: string;
  tags: string[];
  metadata: { event_id?: string; task_due?: string };
}

interface Topic {
  id: string;
  messages: Communication[];
  people: Set<string>;
  timeRange: { start: Date; end: Date };
  relevanceScore: number;
  lastUpdated: Date;
}

interface InboxLayoutProps {
  user: User;
  topics: Topic[];
}

export default function InboxLayout({ user, topics }: InboxLayoutProps) {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [selectedCommId, setSelectedCommId] = useState<string | null>(null);

  const selectedTopic = topics.find(t => t.id === selectedTopicId) || null;
  const selectedComm = selectedTopic?.messages.find(m => m.id === selectedCommId) || null;

  return (
    <div className="flex flex-col h-[calc(100vh-80px)]">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        {/* Far Left: Topics */}
        <Sidebar user={user} topics={topics} onSelectTopic={setSelectedTopicId} />
        {/* Middle: Communication List for Selected Topic */}
        <div className="w-1/3 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
          {selectedTopic ? (
            <CommunicationList
              communications={selectedTopic.messages}
              onSelect={setSelectedCommId}
            />
          ) : (
            <div className="p-4 text-gray-600 dark:text-gray-400">
              Select a topic to view communications
            </div>
          )}
        </div>
        {/* Far Right: Selected Communication Preview */}
        <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto">
          {selectedComm ? (
            <CommunicationPreview communication={selectedComm} />
          ) : (
            <div className="text-gray-600 dark:text-gray-400">
              Select a communication to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
}