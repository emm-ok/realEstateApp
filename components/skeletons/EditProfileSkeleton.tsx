import { Skeleton } from "../ui/Skeleton";

export const EditProfileSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <Skeleton className="h-7 w-40 mb-6" />
      <div className="rounded-2xl p-6 space-y-6 bg-background border">
        <div className="flex items-center gap-6">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-9 w-32 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-12 w-full rounded-xl" />
            </div>
          ))}
          <div className="md:col-span-2 space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-32 w-full rounded-xl" />
          </div>
          <div className="md:col-span-2 flex justify-end">
            <Skeleton className="h-12 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
};
