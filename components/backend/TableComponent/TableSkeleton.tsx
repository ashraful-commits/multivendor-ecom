"use client";
import { Skeleton } from '@/components/ui/skeleton';

const TableSkeleton = () => {
  return (
    <div className="w-full flex flex-col gap-4 mx-auto my-auto">
      <Skeleton className="w-full px-4 bg-slate-800 dark:bg-slate-200 min-h-[50px]" />
      <Skeleton className="w-full px-4 bg-slate-800 dark:bg-slate-200 min-h-[50px]" />
      <Skeleton className="w-full px-4 bg-slate-800 dark:bg-slate-200 min-h-[50px]" />
      <Skeleton className="w-full px-4 bg-slate-800 dark:bg-slate-200 min-h-[50px]" />
      <Skeleton className="w-full px-4 bg-slate-800 dark:bg-slate-200 min-h-[50px]" />
    </div>
  );
};

export default TableSkeleton;
