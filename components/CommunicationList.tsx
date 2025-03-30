// components/CommunicationList.tsx
'use client';

interface Communication {
  id: string;
  sender: string;
  content: string;
}

interface CommunicationListProps {
  communications: Communication[];
  onSelect: (id: string) => void;
}

export default function CommunicationList({ communications, onSelect }: CommunicationListProps) {
  return (
    <div className="w-1/3 bg-white border-r overflow-y-auto">
      {communications.map(comm => (
        <div
          key={comm.id}
          className="p-2 border-b cursor-pointer hover:bg-gray-50"
          onClick={() => onSelect(comm.id)}
        >
          <p className="font-semibold">{comm.sender}</p>
          <p className="text-sm text-gray-600 truncate">{comm.content}</p>
        </div>
      ))}
    </div>
  );
}