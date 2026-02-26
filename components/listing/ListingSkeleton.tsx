import { Skeleton } from "@/components/ui/Skeleton";

const ListingSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      
      {/* Image Skeleton */}
      <Skeleton className="h-52 w-full rounded-none" />

      {/* Content */}
      <div className="p-5 space-y-4">
        
        {/* Title */}
        <Skeleton className="h-5 w-3/4" />

        {/* Location */}
        <Skeleton className="h-4 w-2/3" />

        {/* Beds / Baths */}
        <div className="flex justify-between">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-20" />
        </div>

        {/* Price */}
        <Skeleton className="h-6 w-1/3" />

        {/* Buttons */}
        <div className="flex gap-3 pt-2">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default ListingSkeleton;