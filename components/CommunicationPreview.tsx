// components/CommunicationPreview.tsx
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

interface CommunicationPreviewProps {
  communication: Communication;
}

export default function CommunicationPreview({ communication }: CommunicationPreviewProps) {
  return (
    <div className="w-full p-4 bg-white dark:bg-gray-800 overflow-y-auto">
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{communication.sender}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">Type: {communication.type}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Source: {communication.source}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">Recipient: {communication.recipient}</p>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Timestamp: {new Date(communication.timestamp).toLocaleString()}
      </p>
      <p className="mt-2 text-gray-700 dark:text-gray-300">{communication.content}</p>
      {communication.tags.length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">Tags: {communication.tags.join(', ')}</p>
      )}
      {communication.metadata && Object.keys(communication.metadata).length > 0 && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Metadata: {JSON.stringify(communication.metadata)}
        </p>
      )}
    </div>
  );
}