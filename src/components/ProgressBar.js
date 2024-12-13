import React from 'react';

function ProgressBar({ percentage, info }) {
  return (
    <div className="w-full bg-gray-200 rounded-lg h-32 relative flex">
      <div
        className="bg-gradient-to-br from-blue-400 to-purple-500 h-full rounded-lg"
        style={{ width: `${percentage}%` }}
      ></div>

      <div
        className={`h-full text-black p-4 ${
          percentage > 60 ? 'absolute top-0 left-0' : 'relative'
        }`}
      >
        <p className="text-black text-left">{percentage}%</p>
        <p className="text-black text-left text-xs">{info}</p>
      </div>
    </div>
  );
}

export default ProgressBar;
