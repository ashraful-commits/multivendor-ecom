import React from 'react';
import { ShoppingCart } from 'lucide-react';
import {SmallCardProps} from "../../typescript"
const SmallCard = ({ data }:SmallCardProps) => {
  return (
    <div className={`rounded-lg shadow-lg bg-slate-700 dark:bg-white dark:text-slate-900 p-3 text-white`}>
      <div className="flex justify-start items-center gap-x-3">
        <div
          className={`${data.color} rounded-full items-center justify-center  w-8 h-8 p-2 `}
        >
          {data.icon}
        </div>
        <div className="flex flex-col items-start justify-center">
          <p className="">{data.title}</p>
          <h3 className="font-bold text-2xl">{data.sales}</h3>
        </div>
      </div>
    </div>
  );
};

export default SmallCard;
