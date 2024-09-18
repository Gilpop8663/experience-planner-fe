import Skeleton from "./Skeleton";

export default function CampaignListByCalendarLoading() {
  return (
    <div>
      <div className="py-2 text-sm">
        <div className="flex gap-2">
          <Skeleton className="w-60 h-8" />
        </div>
        <div className="flex gap-2 my-2">
          <span>
            <Skeleton className="w-60 h-8" />
          </span>
          <span>
            <Skeleton className="w-60 h-8" />
          </span>
        </div>
      </div>
      <Skeleton className="w-full h-[700px]" />
    </div>
  );
}
