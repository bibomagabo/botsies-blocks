import React from 'react';

export default function SidePanel() {
  return (
    <div className="w-64 bg-gray-100 dark:bg-gray-800 text-black dark:text-white p-4 flex flex-col space-y-4 shadow-md">
      {/* Header */}
      <div className="text-lg font-bold">Assistants</div>

      {/* Assistant Names */}
      <ul className="space-y-2">
        <li className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer">
          Default Assistant
        </li>
        <li className="p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600 cursor-pointer">
          Future Assistant
        </li>
      </ul>

      {/* Settings Placeholder */}
      <div className="mt-4">
        <div className="text-sm font-semibold mb-2">Settings</div>
        <button className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Placeholder Option
        </button>
      </div>

      {/* Future Features Placeholder */}
      <div className="mt-auto">
        <div className="text-sm font-semibold mb-2">Other Features</div>
        <button className="w-full p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-md hover:bg-gray-400 dark:hover:bg-gray-600">
          Placeholder Feature
        </button>
      </div>
    </div>
  );
}
