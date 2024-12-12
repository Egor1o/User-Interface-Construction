import React from 'react';

function InfoBox({ title, content, unit }) {
  return (
    <div className="bg-gray-200 rounded-lg h-32 flex justify-between items-start relative flex-col p-2">
    <p className="text-black text-base text-left">
      {title}
    </p>
    <div className="flex items-end">
      <p
        className=" text-black text-3xl text-left">
         {content}
      </p>
      <p className="text-black text-sm text-left">{unit}</p>
    </div>

    </div>
  );
}

export default InfoBox;
