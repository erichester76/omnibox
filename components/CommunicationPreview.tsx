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
    <div className="w-2/3 p-6 bg-white overflow-y-auto">
      <h2 className="text-xl font-bold">{communication.sender}</h2>
      <p className="mt-2 text-gray-700">{communication.content}</p>
    </div>
  );
}