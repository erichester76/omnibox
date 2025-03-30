// components/Toolbar.tsx
'use client';

export default function Toolbar() {
  return (
    <div className="bg-gray-200 p-2 flex items-center">
      <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 mr-2">
        Refresh
      </button>
      <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
        New
      </button>
    </div>
  );
}