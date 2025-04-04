// components/CommunicationList.tsx
'use client';

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

interface CommunicationListProps {
  communications: Communication[];
  onSelect: (id: string) => void;
}

export default function CommunicationList({ communications, onSelect }: CommunicationListProps) {
  return (
    <div className="w-full bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
      {communications.map(comm => (
        <div
          key={comm.id}
          className="p-2 border-b border-gray-200 dark:border-gray-700 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
          onClick={() => onSelect(comm.id)}
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100">{comm.sender}</p>
          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">{comm.content}</p>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {new Date(comm.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}