// components/Toolbar.tsx
'use client';

export default function Toolbar() {
    return (
      <div className="bg-gray-200 dark:bg-gray-700 p-2 flex items-center">
        <button className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700 mr-2">
          Refresh
        </button>
        <button className="px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700">
          New
        </button>
      </div>
    );
  }