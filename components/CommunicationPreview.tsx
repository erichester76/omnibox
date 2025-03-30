// components/CommunicationPreview.tsx
'use client';

interface Communication {
  id: string;
  sender: string;
  content: string;
}

interface CommunicationPreviewProps {
  communication: Communication;
}

export default function CommunicationPreview({ communication }: CommunicationPreviewProps) {
    return (
      <div className="flex-1 p-4 bg-white dark:bg-gray-800 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{communication.sender}</h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{communication.content}</p>
      </div>
    );
  }