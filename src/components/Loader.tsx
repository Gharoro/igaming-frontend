import Skeleton from "react-loading-skeleton";

export default function Loader({ count }: { count: number }) {
  return (
    <div className="p-3">
      <Skeleton baseColor="#1f2937" count={count || 1} />
    </div>
  );
}
