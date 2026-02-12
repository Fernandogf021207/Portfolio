import React from 'react';

const DesktopIcon = ({ label, icon, onDoubleClick }) => {
  return (
    <div 
      className="flex flex-col items-center mb-4 w-24 cursor-pointer group"
      onDoubleClick={onDoubleClick}
    >
      <div className="w-8 h-8 mb-1 relative flex justify-center items-center">
        {icon}
      </div>
      <span className="text-white text-xs font-bold text-center px-1 bg-transparent group-hover:bg-[#000080] group-hover:border-dotted group-hover:border-[1px] group-hover:border-white select-none">
        {label}
      </span>
    </div>
  );
};

export default DesktopIcon;
