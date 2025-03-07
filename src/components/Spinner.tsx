export default function Spinner({ color }: { color?: string }) {
  return (
    <div
      className={`animate-spin h-5 w-5 border-2 border-${
        color || "white"
      } border-t-transparent rounded-full`}
    ></div>
  );
}
