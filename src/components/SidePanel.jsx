import React from "react";

const SidePanel = () => {
  return (
    <aside className="sidebar fixed top-0 left-0 h-full w-64 bg-gray-100 border-r border-gray-300 hidden md:block">
      <div className="p-4">
        <h2 className="text-lg font-semibold">Assistants</h2>
        <ul className="mt-4 space-y-2">
          <li>Default Assistant</li>
          <li>Future Assistant</li>
        </ul>
        <h3 className="mt-6 font-semibold">Settings</h3>
        <ul className="mt-2 space-y-2">
          <li>Placeholder Option</li>
        </ul>
        <h3 className="mt-6 font-semibold">Other Features</h3>
        <ul className="mt-2 space-y-2">
          <li>Placeholder Feature</li>
        </ul>
      </div>
    </aside>
  );
};

export default SidePanel;
